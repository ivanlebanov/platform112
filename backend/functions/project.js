const Project = require('../models/Project.js')
const axios = require('axios')
const rp = require('request-promise')
const $ = require('cheerio')
const fs = require('fs')

class Projects {
  static async fetch (req, res) {
    // get all urls
    let { headers, data } = await axios.get('https://hackcrisis.bg/wp-json/wp/v2/idea?per_page=100')
    for (let i = 2; i <= headers['x-wp-totalpages']; i++) {
      const resp = await axios.get(`https://hackcrisis.bg/wp-json/wp/v2/idea?per_page=100&page=${i}`)
      data = [...data, ...resp.data]
    }
    data = data.map(item => { return item.guid.rendered })
    // const test = data[0]
    // const html = await rp(test)
    // let elem = $('.entry-content', html)
    await fs.writeFile(`./uploads/test.json`, JSON.stringify(data), (param) => { })
    // console.log(elem[0].children)
  }
}

module.exports = Projects
