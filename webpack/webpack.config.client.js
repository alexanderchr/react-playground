var webpack = require('webpack')
var path = require('path')

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
    filename: '[name].js',
    path: prependRoot('build/client'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [prependRoot('node_modules'), prependRoot('src')],
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
      { test: /\.scss$/, include: prependRoot('src'), loaders: ['isomorphic-style', 'css?modules&sourceMap', 'sass?sourceMap'] },
      { test: /\.scss$/, exclude: prependRoot('src'), loaders: ['isomorphic-style', 'css?sourceMap', 'sass?sourceMap'] },
      { test: /\.css$/, include: prependRoot('src'), loaders: ['isomorphic-style-loader', 'style', 'css?modules&sourceMap'] },
      { test: /\.css$/, exclude: prependRoot('src'), loaders: ['isomorphic-style-loader', 'style', 'css?sourceMap'] },
      { test: /\.(eot|woff|woff2|ttf|svg)(\?[a-zA-Z0-9\.\=]*)?$/, loader: 'url-loader' },
    ]
  },
  sassLoader: {
    includePaths: [...bourbon.includePaths, ...bourbonNeat.includePaths, './vendor']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({ debug: true }),
  ]
}

function prependRoot(directory) {
  return path.resolve(__dirname, '..', directory)
}
