var webpack = require('webpack')
var webpackConfig = require('./webpack.config')
var express = require('express')

var app = express()
var compiler = webpack(webpackConfig)


app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, stats: { colors: true }
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static('src'))

app.listen(8000, function() {
  console.log('Listening@localhost:8000')
})
