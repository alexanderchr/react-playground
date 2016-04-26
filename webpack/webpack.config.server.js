var webpack = require('webpack')
var path = require('path')
var fs = require('fs');

var bourbon = require('node-bourbon')
var bourbonNeat = require('node-neat')

var nodeModules = {};
fs.readdirSync(prependRoot('node_modules'))
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  target: 'node',
  node: {
    __dirname: '.',
    __filename: false
  },
  entry: [
    'webpack/hot/signal',
    'babel-polyfill',
    'server'
  ],
  output: {
    filename: '[name].js',
    path: prependRoot('build/server'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [prependRoot('node_modules'), prependRoot('src')],
  },
  externals: nodeModules,
  devtool: 'eval',
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: prependRoot('src'),
        exclude: [/node_modules/],
      },
      { test: /\.(eot|woff|woff2|ttf|svg)(\?[a-zA-Z0-9\.\=]*)?$/, loader: 'url-loader' },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

function prependRoot(directory) {
  return path.resolve(__dirname, '..', directory)
}
