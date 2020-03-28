const mongoose = require('mongoose')
// Not sure
const schema = mongoose.Schema({
  name: String,
  needs: String,
  category: String,
  team: String,
  slack: String,
  description: String,
  solution: String
})
module.exports = mongoose.model('Project', schema, 'Project')
