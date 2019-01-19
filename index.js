// Expose this with `ngrok $PORT`
require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const compress = require('compression')();
const expressValidator = require('express-validator');
const cors = require('cors');
const routes = require('./routes')
const mongoose = require('mongoose')

const databaseUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/binance_safu'
mongoose.connect(databaseUri, {
  useNewUrlParser: true
})
mongoose.connection.on('error', error => console.log(error))
mongoose.Promise = global.Promise

const port = process.env.PORT;

const corsOptions = {
  origin: '*'
};

const app = express();
app.use(bodyParser());
app.use(expressValidator());
app.use(express.json());
app.options('*', cors())
app.use(cors(corsOptions));

app.use(routes)

app.set('port', port);

var server = app.listen(app.get('port'), function() {
  console.log('Webhook Test express server listening on port ', port);
});
