// @flow

import url from 'url';

import express from 'express';
import dynamicMiddleware from 'dynamic-middleware';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxyMiddleware from 'express-http-proxy';

import webpackConfig from '../../webpack/webpack.config.client';
import renderServerSide from 'server/renderServerSide';

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true, stats: { colors: true },
}));

app.use(webpackHotMiddleware(compiler));

app.get('/favicon.ico', (req, res) => res.end());

app.use('/graphql', proxyMiddleware('http://localhost:4001/', {
  forwardPath: function(req, res) {
    return url.parse(req.url).path;
  }
}));

app.listen(8000, () => {
  console.log('Listening@localhost:8000'); // eslint-disable-line no-console
});

// Server side rendering - use a replaceable middleware when in dev to allow hot reloading
if (module.hot) {
  const replaceableRenderServerSide = dynamicMiddleware(renderServerSide);
  app.get('*', replaceableRenderServerSide.handler());
  module.hot.accept('./renderServerSide', () => {
    const newRenderServerSide = require('./renderServerSide').default; // eslint-disable-line
    replaceableRenderServerSide.replace(newRenderServerSide);
  });
} else {
  app.get('*', renderServerSide);
}
