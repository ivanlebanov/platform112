const mongoose = require('mongoose')
const schema = mongoose.Schema({
  topic: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic'
  },
  crisises: [
    {
      crisis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crisis'
      }
    }
  ],
  ctas: []
})
module.exports = mongoose.model('Topic', schema, 'Topic')
