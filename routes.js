const request = require('request')
const router = require('express').Router()
const AppError = require('./config/error')
const UserModel = require('./models/user')
const FraudInstanceModel = require('./models/fraudInstance')

const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
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
    request(options, (err, res, body) => {
      if (err) { return console.log(err); }
      res.json(body)
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
        return res.status(200).send({ success: true });

        // INSERT TO PSQL
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

router.post('/fraud-instances/:address/review', (req, res, next) => {
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

/*
This integration uses Twilio to text TO_PHONE number when an alert is triggered
*/
router.post('/twilio', (req, res, next) => {
  twilioClient.messages
  .create({
     body: `heycoral.com 🐙 trust score alert ${req.body.name} on address ${req.body.address}; 🎉`,
     from: process.env.TWILIO_FROM_PHONE_NUMBER,
     to: process.env.TWILIO_TO_PHONE_NUMBER
   })
  .then(message => console.log(message.sid))
  .done();

  console.log(req.body);
  return res.status(200).send('🎉');
});

/*
This integration uses Slack to message channel SLACK_CONVERSATION_ID when an alert is triggered
*/
router.post('/slack', (req, res, next) => {
  slackClient.chat.postMessage({
    channel: process.env.SLACK_CONVERSATION_ID,
    text: `
      🚨 Coral Protocol Trust Score Alert 🚨 \n
      🐙 *Alert Name:* \`${req.body.name}\` \n
      🐙 *Action Type:* \`${req.body.action}\` \n
      🐙 *Address:* \`${req.body.address}\` \n
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
