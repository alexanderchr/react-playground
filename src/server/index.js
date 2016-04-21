// @flow

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config';

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true, stats: { colors: true }
}));

app.use(webpackHotMiddleware(compiler));

// app.use(express.static('src'))

app.listen(8000, function() {
  console.log('Listening@localhost:8000')
})
