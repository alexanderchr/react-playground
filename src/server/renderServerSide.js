// @flow

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toJSON } from 'transit-immutable-js';

import rootReducer from 'universal/ducks';
import routes from 'universal/routes';

class Root extends Component {
  getChildContext = () => ({
    insertCss: this.props.insertCss,
  });

  static childContextTypes = {
    insertCss: PropTypes.func,
  };

  render() {
    const { store, renderProps, insertCss } = this.props;

    return (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );
  }
}

function createHtml(store : any, renderProps : any) {
  let allStyles = [];
  const insertCss = (...styles) => allStyles = allStyles.concat(styles.map(s => s._getCss()));
  const root = ReactDOM.renderToString(<Root {...{ store, renderProps, insertCss }} />);

  return `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
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

const renderServerSide = (req : any, res : any) => {
  const store = createStore(rootReducer);

  res.set('content-type', 'text/html');

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(`<h1>Error</h1> ${error.message}`);
    }

    if (!renderProps) {
      res.status(404).send('<h1>Not found</h1>');
    }

    store.dispatch({
      type: LOCATION_CHANGE,
      payload: renderProps.location,
    });

    const html = createHtml(store, renderProps);
    res.send(html);
  });
}

export default renderServerSide;
