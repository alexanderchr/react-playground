// @flow

import React from 'react';
import ReactDOM from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { toJSON } from 'transit-immutable-js'

import { addEmployee } from 'universal/ducks/employees'

import rootReducer from 'universal/ducks';
import routes from 'universal/routes';

const Root = (props : any) =>
  <Provider store={props.store}>
    <RouterContext {...props.renderProps} />
  </Provider>

function createHtml(store : any, renderProps : any) {
  return `
    <!DOCTYPE html>
    <html>
      <head><title>time-tracker</title></head>
      <body>
        <div id="mount">${ReactDOM.renderToString(<Root {...{store, renderProps}} />)}</div>
        <script>__INITIAL_STATE = '${toJSON(store.getState())}';</script>
        <script src='/bundle.js'></script>
      </body>
    </html>
  `
}

export default function renderServerSide(req : any, res : any) {
  var store = createStore(rootReducer);

  res.set('content-type', 'text/html')

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    store.dispatch(addEmployee('Alex'))

    if (error) {
      res.status(500).send('<h1>as</h1> ' + error.message);
    }

    if (!renderProps) {
      res.status(404).send('<h1>Not found</h1>');
    }

    const html = createHtml(store, renderProps);
    res.send(html);
  })
};
