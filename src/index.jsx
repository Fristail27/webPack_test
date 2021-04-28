import * as $ from 'jquery'
import Post from '@models/post'
import json from './assets/json.json'
import './styles/styles.css'
import './styles/less.less'
import './styles/scss.scss'
import {render} from 'react-dom'
import './babel'
import React from 'react'
import WebpackLogo from './assets/polar_bear_PNG23526.png'
import xml from './assets/data.xml'
import csv from './assets/data.csv'

const post = new Post('webpack post title', WebpackLogo)

// $('pre').addClass('code').html(post.toString())

const App = () => {
    return (
        <div className="container">
            <h1>Webpack</h1>
            <hr/>
            <div className="logo"></div>
            <hr/>
            <pre></pre>
            <hr/>
            <div className="box">
                <h2>less</h2>
            </div>
            <hr/>
            <div className="card">
                <h2>SCSS</h2>
            </div>
        </div>
    )
}

render(<App/>, document.getElementById('app'))

// console.log('post to String', post.toString())
//
// console.log(json)
// console.log(xml)
// console.log(csv)