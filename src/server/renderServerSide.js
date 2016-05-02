// @flow

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import { toJSON } from 'transit-immutable-js';

import routes from 'universal/routes';
import configureStore from 'server/redux/configureStore';
import Root from 'server/root';

function createHtml(store : any, renderProps : any) {
  let allStyles = [];
  // eslint-disable-next-line no-underscore-dangle
  const insertCss = (...styles) => { allStyles = allStyles.concat(styles.map(s => s._getCss())); };
  const root = renderToString(<Root {...{ store, renderProps, insertCss }} />);

  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>time-tracker</title>
        <style type="text/css">${allStyles.join('\n')}</style>
      </head>
      <body>
        <div id="mount">${root}</div>
        <script>__INITIAL_STATE = '${toJSON(store.getState())}';</script>
        <script src='/main.js'></script>
      </body>
    </html>
  `;
}

function extractDependentActions(components : any[]) : any[] {
  return components
    .map(x => x.dependentActions)
    .filter(Boolean)
    .reduce((flattened : any[], actions : any[]) => flattened.concat(actions), []);
}

function renderServerSide(req : any, res : any) {
  res.set('content-type', 'text/html');

  match({ routes, location: req.url }, async (error, redirectLocation, renderProps) => {
    try {
      if (error) {
        res.status(500).send(`<h1>Error</h1> ${error.message}`);
      }

      if (!renderProps) {
        res.status(404).send('<h1>Not found</h1>');
      }

      const store = await configureStore({
        location: renderProps.location,
        authToken: req.cookies.token,
        dependentActions: extractDependentActions(renderProps.components),
      });

      const html = createHtml(store, renderProps);
      res.send(html);
    } catch(e) { console.error(e); }
  });
}

export default renderServerSide;
