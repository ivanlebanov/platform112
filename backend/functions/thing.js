const Thing = require('../models/Thing.js')

class Things {
  static async list (req, res) {
    res.json(await Thing.find().exec())
  }
}

module.exports = Things
