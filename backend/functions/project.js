const Project = require('../models/Project.js')
const axios = require('axios')
const rp = require('request-promise')
const $ = require('cheerio')
const fs = require('fs')
const natural = require('natural');
const translate = require('@vitalets/google-translate-api');
const _ = require('lodash');
const Aigle = require('aigle');
var TfIdf = natural.TfIdf;
let s = fs.readFileSync('tfds');
let {indexMapping, tfid} = JSON.parse(s);
var tfidfCommon = new TfIdf(tfid);

class Projects {
    static async fetch(req, res) {
        // get all urls
        let {headers, data} = await axios.get('https://hackcrisis.bg/wp-json/wp/v2/idea?per_page=100')
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
                if (elem[0].children[i].name === 'span' && elem[0].children[i].attribs && elem[0].children[i].attribs && elem[0].children[i].attribs.class === 'single-idea-title') {
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
                if (elem[0].children[i].name === 'span' && elem[0].children[i].attribs && elem[0].children[i].attribs && elem[0].children[i].attribs.class === 'single-idea-title') {
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

    static async translate(req, res) {
        let projects = await Project.find().exec();
        let total = 0;
        res.writeHead(200, {'Content-Type': 'text/plain'});
        await Aigle.eachLimit(projects, 10, async (project) => {
            return await Promise.all([
                project.description ? translate(project.description, {from: 'bg', to: 'en'}) : Promise.resolve(''),
                project.solution ? translate(project.solution, {from: 'bg', to: 'en'}) : Promise.resolve(''),
                project.needs ? translate(project.needs, {from: 'bg', to: 'en'}) : Promise.resolve(''),
            ]).then(([descriptionEn, solutionEn, needsEn]) => {
                project.descriptionEn = descriptionEn && descriptionEn.text;
                project.solutionEn = solutionEn && solutionEn.text;
                project.needsEn = needsEn && needsEn.text;
                return project.save();
            }).catch((err) => console.log(err));
        });
        res.send(`${total}/${projects.length}`);
    }

    static async retfidf(req, res) {
        let projects = await Project.find().exec();
        let total = 0;
        let indexMapping = [];
        tfidfCommon = new TfIdf();
        projects.forEach((project, i) => {
            if (project.solutionEn || project.descriptionEn) {
                tfidfCommon.addDocument((project.solutionEn || '') + ' ' + (project.descriptionEn || ''));
                indexMapping.push(i);
            }
            total++;
        });
        var s = JSON.stringify({tfid: tfidfCommon, indexMapping});
        fs.writeFileSync('tfds', s);
        await Aigle.eachLimit(projects, 10, (proj, i) => {
            proj.terms = tfidfCommon.listTerms(indexMapping.indexOf(i)).map(function (item) {
                return {term: item.term, tfidf: item.tfidf};
            });
            return proj.save();
        });
        res.send('OK');
    }

    static async tfidf(req, res) {
        let projects = await Project.find().exec();
        let map = [];
        tfidfCommon.tfidfs(['доброволци'], function (i, measure) {
            measure && map.push({
                proj: projects[indexMapping[i]].solution,
                measure
            });
        });
        res.send({
            volunteer: map,
            /* tfidf: tfidfCommon.listTerms(index /!*document index*!/).map(function (item) {
             return {term: item.term, tfidf: item.tfidf};
             }), pro: projects[index]*/
        });
    }

    static async list(req, res) {
        let projects = await Project.find().exec();
        res.send(projects.map((proj, i) => {
            let p = proj.toJSON();
            p.terms = tfidfCommon.listTerms(indexMapping.indexOf(i)).map(function (item) {
                return {term: item.term, tfidf: item.tfidf};
            });
            return p;
        }));
    }
}

module.exports = Projects
