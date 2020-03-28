import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  user: null,
  id: (localStorage.getItem('id')) ? localStorage.getItem('id') : null,
  token: (localStorage.getItem('token')) ? localStorage.getItem('token') : null,
  logged_in: false,
  loaded: false
}

export default {
  state,
  getters,
  actions,
  mutations
}
