var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js')

var compiler = webpack(webpackConfig);

var server = new WebpackDevServer(compiler, {
  contentBase: '/',
  historyApiFallback: true,
  quiet: false,
  hot: true,
  filename: 'index.html',
  publicPath: '/',
  stats: { colors: true }
});

server.listen(8080, 'localhost', function() {});

