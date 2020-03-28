import * as types from '@/store/types'
export default {
  SET_USER(state, data) {
    state.user = data
  },
  SET_TOKEN(state, data) {
    localStorage.setItem('token', data)
    state.token = data
  },
  SET_ID(state, data) {
    localStorage.setItem('id', data)
    state.id = data
  },
  SET_LOGGED_IN(state, data) {
    state.logged_in = data
  },
  SET_LOADED(state, data) {
    state.loaded = data
  },
  SET_USERS(state, data) {
    state.users = data
  },
}
