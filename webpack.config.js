var Webpack = require('webpack')
var HtmlPlugin = require('html-webpack-plugin')
var path = require('path')

var bourbon = require('node-bourbon')
var bourbonNeat = require('node-neat')

module.exports = {
  entry: ['./src/main.js'],
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
      { test: /\.(js|jsx)$/, loader: 'babel-loader', include: prependRoot('src') },
      { test: /\.scss$/, include: './src', include: prependRoot('src'), loaders: ['style', 'css?modules&sourceMap', 'sass?sourceMap'] },
      { test: /\.scss$/, exclude: './src', exclude: prependRoot('src'), loaders: ['style', 'css?sourceMap', 'sass?sourceMap'] },
      { test: /\.css$/, include: './src', loaders: ['style', 'css?modules&sourceMap'] },
      { test: /\.css$/, exclude: './src', loaders: ['style', 'css'] },
      { test: /\.(eot|woff|woff2|ttf|svg|)$/, loader: 'url-loader' }
    ]
  },
  sassLoader: {
    includePaths: [...bourbon.includePaths, ...bourbonNeat.includePaths, './vendor']
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new HtmlPlugin({
      template: 'src/index.html',
      inject: 'body'
    }),
    new Webpack.NoErrorsPlugin()
  ]
}

function prependRoot(directory) {
  return path.resolve(__dirname, directory)
}
