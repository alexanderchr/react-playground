var webpack = require('webpack')
var path = require('path')

var cssNext = require('postcss-cssnext');
var modulesValues = require('postcss-modules-values');

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'client'
  ],
  output: {
    publicPath: '/',
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

      {
        test: /\.css$/,
        loaders: [
          'isomorphic-style',
          {
            loader: 'css',
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]---[local]---[hash:base64:5]',
            },
          },
          'postcss',
        ]
      },

      { test: /\.(eot|woff|woff2|ttf|svg)(\?[a-zA-Z0-9\.\=]*)?$/, loader: 'file-loader' },
    ]
  },
  postcss: function() {
    return [cssNext, modulesValues];
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({ debug: true }),
  ]
}

function prependRoot(directory) {
  return path.resolve(__dirname, '..', directory)
}
