import * as types from '@/store/types'

export default {
  user: (state, id) => {
    return state.user
  },
  users: (state, id) => {
    return state.users
  },
  id: (state) => {
    return state.id
  },
  token: (state) => {
    return state.token
  },
  logged_in: (state) => {
    return state.logged_in
  },
  loaded: (state) => {
    return state.loaded
  },
  view_as: (state) => {
    return state.view_as
  }
}
