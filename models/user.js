const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    index: true
  },
  apiKey: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  walletAddress: {
    type: String
  },
  walletBalance: {
    type: Number
  },
  allowedToSubmitFraud: {
    type: Boolean
  },
  allowedToReviewFraud: {
    type: Boolean
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('users', UserSchema)
