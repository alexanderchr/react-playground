// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from 'universal/ducks';


export default function (intialState : mixed, history : any) {
  const middleware = [
    thunkMiddleware,
    routerMiddleware(history),
    createLogger(),
  ];

  const store = createStore(rootReducer, intialState, compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  if (module.hot) {
    module.hot.accept('universal/ducks', () => {
      const nextReducer = require('universal/ducks').default; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
