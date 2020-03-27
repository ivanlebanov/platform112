const Thing = require('../models/Thing.js')

class Integrations {
  static async add (req, res) {
    res.json(await Thing.find().exec())
  }
}

module.exports = Integrations
