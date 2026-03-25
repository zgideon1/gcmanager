const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(403).send({
        error: 'No token provided'
      })
    }

    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, config.authentication.jwtSecret)

    req.user = decoded

    next()
  } catch (err) {
    return res.status(403).send({
      error: 'Invalid token'
    })
  }
}