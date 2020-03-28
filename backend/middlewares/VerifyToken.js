const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

module.exports = async (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' })
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: data._id, 'tokens.token': token }).exec()
    if (!user) {
      // throw new Error()
      res.status(401).send({ error: 'Not authorized to access this resource' })
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}
