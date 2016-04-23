// @flow

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config';
import renderServerSide from 'server/renderServerSide'

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    noInfo: true, stats: { colors: true }
}));

app.use(webpackHotMiddleware(compiler));

app.get('/favicon.ico', (req, res) => res.end());

app.listen(8000, function() {
  console.log('Listening@localhost:8000')
})

// Server side rendering - use a replaceable middleware when in dev to allow hot reloading
if(module.hot) {
  const dynamicMiddleware = require('dynamic-middleware');
  let replaceableRenderServerSide = dynamicMiddleware(renderServerSide);
  app.get('*', replaceableRenderServerSide.handler());

	module.hot.accept('./renderServerSide', function() {
    console.log('hot reloading')
    replaceableRenderServerSide.replace(require('./renderServerSide').default);
	});
} else {
  app.get('*', renderServerSide);
}
