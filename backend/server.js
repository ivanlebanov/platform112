require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose').set('debug', true)
const app = express()
const VerifyToken = require('./middlewares/VerifyToken')
const isAdmin = require('./middlewares/isAdmin')
const cors = require('cors')

mongoose.connect(process.env.DB, { useNewUrlParser: true, useCreateIndex: true })
var allowedOrigins = ['http://localhost:8080', 'http://localhost:8080/', 'http://localhost:8100', 'http://localhost:8100/']
app.use(cors({
  exposedHeaders: ['Content-Length', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token', 'x-access-token-viewas', 'cache-control'],
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.'
      return callback(new Error(msg), false)
    }
    return callback(null, true)
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS']
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })
)
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, cache-control')
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header('Content-Type', 'application/json')
  res.header('Vary', 'Origin')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

const server = app.listen(3000)
const sockets = require('./libs/Sockets')
sockets.init(server)

const thing = require('./functions/thing.js')
app.get('/', (req, res) => { res.send('hi') })
app.post('/thing', VerifyToken, thing.add)
