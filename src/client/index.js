// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { fromJSON } from 'transit-immutable-js';

import configureStore from 'client/redux/configureStore';
import Root from './root';

// injected by `renderServerSide`
declare var __INITIAL_STATE : string;

const store = configureStore(__INITIAL_STATE && fromJSON(__INITIAL_STATE), browserHistory);
const syncedHistory = syncHistoryWithStore(browserHistory, store);

function renderCompleted() {
  const ssrStyles = document.getElementById('ssr-styles');
  if (ssrStyles && ssrStyles.parentNode) {
    ssrStyles.parentNode.removeChild(ssrStyles);
  }
}

const mount = document.getElementById('mount');

ReactDOM.render((
  <AppContainer><Root store={store} history={syncedHistory} /></AppContainer>
), mount, renderCompleted);

if (module.hot) {
  module.hot.accept('./root', () => {
    require('./root');
    ReactDOM.render((
      <AppContainer><Root store={store} history={syncedHistory} /></AppContainer>
    ), mount);
  });
}
