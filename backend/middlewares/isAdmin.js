const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(403).send({ auth: false, message: 'No token provided.' })
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err || !decoded.isAdmin) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    }
    req.userId = decoded._id
    req.userToken = decoded.token
    req.userEmail = decoded.email
    req.userFullName = `${decoded.firstName} ${decoded.lastName}`
    next()
  })
}
