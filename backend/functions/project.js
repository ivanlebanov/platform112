const Project = require('../models/Project.js')
const axios = require('axios')
class Projects {

  static async fetch (req, res) {

    let { headers, data } = await axios.get('https://hackcrisis.bg/wp-json/wp/v2/idea?per_page=100')
    for (let i = 2; i <= headers['x-wp-totalpages']; i++) {
      const resp = await axios.get(`https://hackcrisis.bg/wp-json/wp/v2/idea?per_page=100&page=${i}`)
      data = [...data, ...resp.data]
    }
    data = data.map(item => { return item.guid.rendered })
    console.log(data)
  }

}

module.exports = Projects
