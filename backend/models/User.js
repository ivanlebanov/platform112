const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: 'Invalid Email address' })
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  created_on: {
    type: Date,
    default: () => new Date()
  },
  location: [
    {
      lng: String,
      lat: String
    }
  ],
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  questionnaireData: [
    {
      questionnaire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Questionnaire'
      },
      key: String,
      value: mongoose.Schema.Types.Mixed
    }
  ]
})

schema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

schema.methods.generateAuthToken = async function () {
  try {
    const user = this
    const signOptions = { expiresIn: '12h' }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, signOptions)
    user.tokens = (user.tokens) ? user.tokens.concat({ token }) : [{ token }]
    await user.save()
    return token
  } catch (e) {
    console.log(e)
  }
}
schema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error({ error: 'Invalid login credentials 1' })
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password)
  console.log('match' + isPasswordMatch)
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid login credentials' })
  }
  return user
}

const User = mongoose.model('User', schema, 'users')

module.exports = User
