import Post from './post'
import json from './assets/json.json'
import './styles/styles.css'
import WebpackLogo from './assets/polar_bear_PNG23526.png'

const post = new Post('webpack post title', WebpackLogo)

console.log('post to String', post.toString())

console.log(json)