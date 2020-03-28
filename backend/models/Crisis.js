const mongoose = require('mongoose')
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: [
    {
      lng: String,
      lat: String
    }
  ]
})
module.exports = mongoose.model('Crisis', schema, 'crisis')
