const router = require('express').Router()
const AppError = require('./config/error')
const UserModel = require('./models/user')

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
    console.log(user);
    if (!user) return next(new AppError('User not found.'))
    res.json(user)
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
