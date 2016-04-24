// // @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { fromJSON } from 'transit-immutable-js';

import configureStore from 'universal/redux/configureStore';
import Root from 'client/root';

// injected by `renderServerSide`
declare var __INITIAL_STATE : string;

const store = configureStore(fromJSON(__INITIAL_STATE));
const history = syncHistoryWithStore(browserHistory, store);

const mount = document.getElementById('mount');

ReactDOM.render((
  <AppContainer component={Root} props={{ store, history }} />
), mount);

if (module.hot) {
  module.hot.accept('./root', () => {
    const NewRoot = require('./root').default; // eslint-disable-line
    ReactDOM.render((
      <AppContainer component={NewRoot} props={{ store, history }} />
    ), mount);
  });
}
