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
    for (const test of data) {
      const html = await rp(test)
      let elem = $('.entry-content', html)
      let description = ''
      let finished = false
      let startingAt = 0
      for (let i = 14; i < elem[0].children.length; i++) {
        if (!finished && elem[0].children[i].type === 'text') {
          description += elem[0].children[i].data
        }
        if (elem[0].children[i].name === 'span' && elem[0].children[i].attribs && elem[0].children[i].attribs && elem[0].children[i].attribs.class === 'single-idea-title' ) {
          finished = true
          startingAt = i
        }
      }
      let solution = ''
      finished = false
      for (let i = startingAt + 1; i < elem[0].children.length; i++) {
        if (!finished && elem[0].children[i].type === 'text') {
          solution += elem[0].children[i].data
        }
        if (elem[0].children[i].name === 'span' && elem[0].children[i].attribs && elem[0].children[i].attribs && elem[0].children[i].attribs.class === 'single-idea-title' ) {
          finished = true
        }
      }
      let obj = new Project({
        category: elem[0].children[0].next.data,
        slack: elem[0].children[4].data,
        hacker: elem[0].children[6].next.data,
        needs: elem[0].children[10].data,
        description,
        solution
      })
      await obj.save()
    }
    // await fs.writeFile(`./uploads/test.json`, JSON.stringify(data), (param) => { })
  }

  static async list (req, res) {
    res.send(await Project.find().exec())
  }
}

module.exports = Projects
