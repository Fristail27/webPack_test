import Post from './post'
import json from './assets/json.json'
import './styles/styles.css'
import WebpackLogo from './assets/polar_bear_PNG23526.png'
import xml from './assets/data.xml'
import csv from './assets/data.csv'

const post = new Post('webpack post title', WebpackLogo)

console.log('post to String', post.toString())

console.log(json)
console.log(xml)
console.log(csv)