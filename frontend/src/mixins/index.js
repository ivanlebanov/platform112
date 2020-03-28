import Moment from 'moment'
import { extendMoment } from 'moment-range'

const moment = extendMoment(Moment)
let mixin = {
  methods: {
    moment() {
      return moment()
    },
    getImgUrl(icon){
      var images = require.context('../assets/img/', false, /\.svg$/)
      return images('./' + icon)
    }
  }
}
export default mixin
