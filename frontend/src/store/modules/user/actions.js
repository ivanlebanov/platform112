import router from '../../../router'
import Vue from 'vue'
import axios from 'axios'

export default {

  async login({
    state,
    commit,
    dispatch
  }, form) {
    try {
      let { data: { token, user } } = await axios.post('/user/login', form)
      axios.defaults.headers.common['x-access-token'] = token
      commit('SET_TOKEN', token)
      commit('SET_ID', user._id)
      commit('SET_USER', user)
      commit('SET_LOGGED_IN', true)
      commit('SET_LOADED', true)
      setTimeout(function() {
        router.push({
          name: 'Home'
        })
      }, 100)
    } catch (e) {
      console.log(e)
    }
  },
  async register({
    state,
    commit,
    dispatch
  }, data) {
    return axios.post('/user', data)
      .then(data => {
        axios.defaults.headers.common['x-access-token'] = data.data.token
        commit('SET_TOKEN', data.data.token)
        commit('SET_ID', data.data.user._id)
        commit('SET_USER', data.data.user)
        commit('SET_LOGGED_IN', true)
        commit('SET_LOADED', true)
        setTimeout(function() {
          router.push({
            name: 'Home'
          })
        }, 100)
        return data.data
      })
      .catch(r => {
        return null
        // return 401
      })
  },
  async logout({
    state,
    commit,
    dispatch
  }) {
    try {
      const { data } = await axios.post('/user/logout')
      commit('SET_TOKEN', null)
      commit('SET_ID', null)
      commit('SET_USER', null)
      commit('SET_LOGGED_IN', false)
      if(!data){
        router.push({
          name: 'Home'
        })
      }
    } catch (e) {
      console.log(e)
    }
  },
  async checkToken({
    state,
    commit,
    dispatch
  }) {
    try {
      const { data } = await axios.get('/user/authenticated')
      commit('SET_LOGGED_IN', true)
      commit('SET_USER', data)
      commit('SET_LOADED', true)
      return data
    } catch (e) {
      commit('SET_LOADED', true)
      commit('SET_LOGGED_IN', false)
      return null
    }
  },

}
