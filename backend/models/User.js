const mongoose = require('mongoose')

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  token: String,
  avatar: String,
  email: {
    type: String,
    required: true
  },
  created_on: Date,
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('User', schema, 'users')
