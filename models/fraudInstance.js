const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FraudInstanceSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  blockchain: {
    type: String
  },
  reason: {
    type: String,
    enum: ['blackmail', 'ofac', 'phishing', 'ransomware', 'social_media_platform', 'third_party_blacklist', 'other'],
  },
  severity: {
    type: Number,
    min: 1,
    max: 10,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value.'
    }
  },
  constributor: {
    type: String,
  },
  confirmed: {
    type: Boolean,
  },
  reviewer: {
    type: String,
  },
  url: {
    type: String
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('fraudInstances', FraudInstanceSchema)
