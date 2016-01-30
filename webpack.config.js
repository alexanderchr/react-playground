var Webpack = require('webpack')
var HtmlPlugin = require('html-webpack-plugin')

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
      { test: /\.(js|jsx)$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css?modules&sourceMap', 'sass?sourceMap'] },
      { test: /\.(eot|woff|woff2|ttf|svg|)$/, loader: 'url-loader' }
    ]
  },
  sassLoader: {
    includePaths: [...bourbon.includePaths, ...bourbonNeat.includePaths]
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
