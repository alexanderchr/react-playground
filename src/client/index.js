// // @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import { fromJSON } from 'transit-immutable-js'

import configureStore from 'universal/redux/configureStore'

// injected by `renderServerSide`
declare var __INITIAL_STATE : string;

const store = configureStore(fromJSON(__INITIAL_STATE));
const history = syncHistoryWithStore(browserHistory, store);

var mount = document.getElementById('mount');

var Root = require('./root').default;
ReactDOM.render((
  <AppContainer component={Root} props={{store, history}} />
), mount);

if (module.hot) {
  module.hot.accept('./root', () => {
    var Root = require('./root').default;
    ReactDOM.render((
      <AppContainer component={Root} props={{store, history}} />
    ), mount);
  });
}
