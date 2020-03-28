import router from '../../../router'
import Vue from 'vue'
import axios from 'axios'

export default {
  async list({
    state,
    commit,
    dispatch
  }) {
    try {
      const { data } = await axios.get('/projects')
      commit('SET_PROJECTS', data)
      return data
    } catch (e) {
      console.log(e)
    }
  },

}
