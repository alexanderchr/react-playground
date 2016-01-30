var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js')

// what is this?
webpackConfig.entry.unshift('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server');
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

