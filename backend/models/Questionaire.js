const mongoose = require('mongoose')
// Not sure
const schema = mongoose.Schema({
  name: String,
  steps: [
    {
      question: String
    }
  ]
})
module.exports = mongoose.model('Questionnaire', schema, 'Questionnaire')
