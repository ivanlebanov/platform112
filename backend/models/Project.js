const mongoose = require('mongoose')
// Not sure
const schema = mongoose.Schema({
    hacker: String,
    needs: String,
    category: String,
    team: String,
    slack: String,
    description: String,
    solution: String,
    natural: 'Mixed'
});
module.exports = mongoose.model('Project', schema, 'Project')
