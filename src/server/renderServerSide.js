// @flow

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';
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
  let styles = [];
  const insertCss = s => styles.push(s._getCss());
  const root = ReactDOM.renderToString(<Root {...{ store, renderProps, insertCss }} />);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>time-tracker</title>
        <style type="text/css">${styles.join('\n')}</style>
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

    const html = createHtml(store, renderProps);
    res.send(html);
  });
}

export default renderServerSide;
