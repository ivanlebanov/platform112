const Moment = require('moment')
const MomentRange = require('moment-range')
// const moment = MomentRange.extendMoment(Moment)
module.exports = {
  isValidDate: (d) => {
    return d instanceof Date && !isNaN(d)
  },
  getRandomInt: (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
