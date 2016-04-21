var webpack = require('webpack')
var path = require('path')

var HtmlPlugin = require('html-webpack-plugin')

var bourbon = require('node-bourbon')
var bourbonNeat = require('node-neat')

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'client'
  ],
  output: {
    filename: 'bundle.js',
    path: prependRoot('dist')
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules', prependRoot('src')],
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: prependRoot('src'),
        exclude: [/node_modules/],
      },
      { test: /\.scss$/, include: prependRoot('src'), loaders: ['style', 'css?modules&sourceMap', 'sass?sourceMap'] },
      { test: /\.scss$/, exclude: prependRoot('src'), loaders: ['style', 'css?sourceMap', 'sass?sourceMap'] },
      { test: /\.css$/, include: prependRoot('src'), loaders: ['style', 'css?modules&sourceMap'] },
      { test: /\.css$/, exclude: prependRoot('src'), loaders: ['style', 'css?sourceMap'] },
      { test: /\.(eot|woff|woff2|ttf|svg)(\?[a-zA-Z0-9\.\=]*)?$/, loader: 'url-loader' },
    ]
  },
  sassLoader: {
    includePaths: [...bourbon.includePaths, ...bourbonNeat.includePaths, './vendor']
  },
  plugins: [
    new HtmlPlugin({
      template: 'src/server/index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

function prependRoot(directory) {
  return path.resolve(__dirname, directory)
}
