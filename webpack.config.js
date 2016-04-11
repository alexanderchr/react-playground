var webpack = require('webpack')
var path = require('path')

var HtmlPlugin = require('html-webpack-plugin')

var bourbon = require('node-bourbon')
var bourbonNeat = require('node-neat')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/main'
  ],
  output: {
    filename: 'bundle.js',
    path: '/',
  },
  resolve: {
    modulesDirectories: ['node_modules']
  },
  devtool: 'sourcemap',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel-loader'],
        include: prependRoot('src')
      },
      { test: /\.scss$/, include: './src', include: prependRoot('src'), loaders: ['style', 'css?modules&sourceMap', 'sass?sourceMap'] },
      { test: /\.scss$/, exclude: './src', exclude: prependRoot('src'), loaders: ['style', 'css?sourceMap', 'sass?sourceMap'] },
      { test: /\.css$/, include: './src', loaders: ['style', 'css?modules&sourceMap'] },
      { test: /\.css$/, exclude: './src', loaders: ['style', 'css'] },
      { test: /\.(eot|woff|woff2|ttf|svg)(\?[a-zA-Z0-9]*)?$/, loader: 'url-loader' }
    ]
  },
  sassLoader: {
    includePaths: [...bourbon.includePaths, ...bourbonNeat.includePaths, './vendor']
  },
  plugins: [
    new HtmlPlugin({
      template: 'src/index.html',
      inject: 'body'
    })
  ]
}

function prependRoot(directory) {
  return path.resolve(__dirname, directory)
}
