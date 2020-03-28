import Vue from 'vue'
import mixins from './mixins'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import Meta from 'vue-meta'
import Notifications from 'vue-notification'
import VueSweetalert2 from 'vue-sweetalert2'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'
import Vuelidate from 'vuelidate'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
})
Vue.filter('formatDateOnly', function(value) {
  if (value) {
    return moment(String(value)).format('DD.MM.YYYY')
  }
})

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2)
Vue.use(Meta)
Vue.use(Notifications)
Vue.use(
  new VueSocketIO({
    debug: true,
    name: 'websockets-client',
    connection: process.env.VUE_APP_SERVER_URL,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    }
  })
)
Vue.mixin(mixins)
axios.interceptors.request.use(
  config => {
    config.headers['x-access-token'] = localStorage.getItem('token')
    config.baseURL = process.env.VUE_APP_SERVER_URL
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

Vue.config.productionTip = false

new Vue({
  mixins: [mixins],
  router,
  store,
  render: h => h(App)
}).$mount('#app')
