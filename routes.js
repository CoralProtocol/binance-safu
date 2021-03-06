const request = require('request')
const router = require('express').Router()
const AppError = require('./config/error')
const UserModel = require('./models/user')
const FraudInstanceModel = require('./models/fraudInstance')
const psql = require('./lib/psql');

const { WebClient } = require('@slack/client');
const slackClient = new WebClient(process.env.SLACK_TOKEN);

router.get('/', (req, res) => res.send('Welcome to the Binance SAFU hackathon server!'))
router.post('/', (req, res, next) => {
  console.log(req.body);
  return res.status(200).send(`heycoral.com 🐙 trust score alert ${req.body.name} on address ${req.body.address}; 🎉`);
});

router.get('/users/me', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  UserModel.findOne({apiKey: { $regex : new RegExp(apiKey, "i") } }, function(err, user) {
    if (!user) return res.status(404).send({ success: false, errors: [{ detail: "No such user"}] });
    res.json(user)
  });
});

router.get('/trust-scores/:blockchain/:address', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  UserModel.findOne({apiKey: { $regex : new RegExp(apiKey, "i") } }, function(err, user) {
    if (!user) return res.status(404).send({ success: false, errors: [{ detail: "No such user"}] });
    const blockchain = req.params.blockchain
    const address = req.params.address

    const options = {
      url: `https://api.heycoral.com/trust?address=${address}&blockchain=${blockchain}`,
      method: "GET",
      headers: {
        "x-api-key": process.env.CORAL_API_KEY
      }
    }

    request(options, (err, resp, body) => {
      if (err) { return console.log(err); }

      // Adjust the requesting user's balance
      UserModel.findOneAndUpdate({apiKey: { $regex : new RegExp(apiKey, "i") } },
        {$inc : {walletBalance: -1}}, function(err, user) {
      });

      // Merge with our local Mongo instance
      var payload = JSON.parse(body)
      console.log(payload.data)
      var baseScore  = 100 - (payload.data.score * 13);
      FraudInstanceModel.findOne({address: address}, function(error, instance) {
        if (instance) {
          payload.data.severity = instance.severity
          payload.data.reason = instance.reason
          payload.data.url = instance.url
          payload.data.confirmed = instance.confirmed
          payload.data.reviewer = instance.reviewer
          baseScore = baseScore - instance.severity * 10;

          var contributorPayout = 0.8
          var reviewerPayout = 0.1
          UserModel.findOneAndUpdate({apiKey: "coral" },
            {$inc : {walletBalance: 0.2}}, function(err, user) {
          });

          // If there is a contributor, credit the contributor
          if (instance.reviewer) {
            UserModel.findOneAndUpdate({apiKey: instance.reviewer },
              {$inc : {walletBalance: reviewerPayout}}, function(err, user) {
            });
            UserModel.findOneAndUpdate({apiKey: instance.contributor },
              {$inc : {walletBalance: contributorPayout - reviewerPayout}}, function(err, user) {
            });
          } else {
            UserModel.findOneAndUpdate({apiKey: instance.contributor },
              {$inc : {walletBalance: contributorPayout}}, function(err, user) {
            });
          }
          // If the fraud instance has been reviewed, credit the reviewer
        } else {
          // If there's no contributor, all the profits go to Coral
          UserModel.findOneAndUpdate({apiKey: "coral" },
            {$inc : {walletBalance: 1}}, function(err, user) {
          });
        }

        payload.data.score = Math.round(Math.min(100, Math.max(baseScore, 0)));
        return res.status(200).send(payload)
      });
    });
  });
});

router.post('/fraud-instances', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  UserModel.findOne({apiKey: { $regex : new RegExp(apiKey, "i") } }, function(err, user) {
    if (!user) return res.status(404).send({ success: false, errors: [{ detail: "No such user"}] });
    if (!user.allowedToSubmitFraud) return res.status(409).send({ success: false, errors: [{ detail: "Sorry! You're not authorized to submit instances of fraud"}] });

    FraudInstanceModel.findOne({address: req.body.address}, function(error, instance) {
      if (instance) return res.status(409).send({ success: false, errors: [{ detail: "This address has already been reported"}] });

      var newInstance = req.body;
      newInstance.constributor = apiKey;
      newInstance.confirmed = false;

      FraudInstanceModel.create(newInstance, function(error, instance) {
        if (error) return res.status(400).send({ success: false, errors: [{ detail: "Schema error?"}] });

        // Insert into PSQL so our production database is in sync
        const queryString = `
          INSERT INTO fraud_instances(id, address_hash, source, category) VALUES
            ('5a8787b326206a0014797581${req.body.address}', '${req.body.address}', '${req.body.reason}', 'SAFU_test');
        `;
        if (req.body.blockchain == 'eth') {
          psql.ethPsqlClient.query(queryString, (err, res) => {
            if (err) console.log(err);
          });
        }

        else if (req.body.blockchain == 'btc') {
          psql.btcPsqlClient.query(queryString, (err, res) => {
            if (err) console.log(err);
          });
        }


        return res.status(200).send({ success: true });
      });
    });
  });
});

router.get('/fraud-instances', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  UserModel.findOne({apiKey: { $regex : new RegExp(apiKey, "i") } }, function(err, user) {
    if (!user) return res.status(404).send({ success: false, errors: [{ detail: "No such user"}] });
    if (!user.allowedToReviewFraud) return res.status(409).send({ success: false, errors: [{ detail: "Sorry! You're not authorized to submit instances of fraud"}] });

    FraudInstanceModel.find({confirmed: false}, function(error, unreviewedInstances) {
      return res.status(200).send(unreviewedInstances);
    });
  });
});

router.post('/fraud-instances/:blockchain/:address/review', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  UserModel.findOne({apiKey: { $regex : new RegExp(apiKey, "i") } }, function(err, user) {
    if (!user) return res.status(404).send({ success: false, errors: [{ detail: "No such user"}] });
    if (!user.allowedToReviewFraud) return res.status(409).send({ success: false, errors: [{ detail: "Sorry! You're not authorized to submit instances of fraud"}] });

    FraudInstanceModel.findOne({address: req.params.address}, function(error, fraudInstance) {
      if (!fraudInstance) return res.status(404).send({ success: false, errors: [{ detail: "Fraud instance not found"}] });
      if (fraudInstance.constributor == apiKey) return res.status(400).send({ success: false, errors: [{ detail: "You cannot review your own fraud instance submissions"}] });

      FraudInstanceModel.update({address: req.params.address}, {
        confirmed: req.body.confirm,
        reviewer: apiKey
      }, function(error, reviewedInstances) {
        return res.status(200).send({success: true });
      });
    });
  });
});

router.post('/trust-score-alerts', (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  UserModel.findOne({apiKey: { $regex : new RegExp(apiKey, "i") } }, function(err, user) {
    if (!user) return res.status(404).send({ success: false, errors: [{ detail: "No such user"}] });

    const options = {
      url: 'https://api.heycoral.com/trust-score-alerts',
      method: "POST",
      headers: {
        "x-api-key": process.env.CORAL_API_KEY
      },
      json: {
        blockchain: req.body.blockchain,
        name: req.body.name,
        address: req.body.address,
        url: req.body.url,
        secret: req.body.secret,
        action: "fraud_instance.new"
      }
    }

    request(options, (err, resp, body) => {
      if (err) { return console.log(err); }
      return res.status(200).send(body)
    });
  });
});

/*
This integration uses Slack to message channel SLACK_CONVERSATION_ID when an alert is triggered
*/
var recievedAlertsMap = {}
router.post('/slack', (req, res, next) => {
  const address = req.body.address;
  const now = new Date();

  // De-dupe Slack alerts if alerts are more than 5 seconds apart
  if (address in recievedAlertsMap && now - recievedAlertsMap[address] < 1000 * 5) {
    return res.status(200).send('🕔');
  }
  recievedAlertsMap[address] = now;

  slackClient.chat.postMessage({
    channel: process.env.SLACK_CONVERSATION_ID,
    text: `
      🚨 Coral Protocol Trust Score Alert 🚨 \n
      🐙 *Alert Name:* \`${req.body.name}\` \n
      🐙 *Action Type:* \`${req.body.action}\` \n
      🐙 *Address:* \`${address}\` \n
      🐙 *Blockchain:* \`${req.body.blockchain}\` \n
      Thanks for keeping the blockchain safe 🎉
    `
  }).then((res) => {
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);

  console.log(req.body);
  return res.status(200).send('🎉');
});

router.use('*', (req, res, next) => {
  next(new AppError('Route not found.', null, 404))
})

module.exports = router
