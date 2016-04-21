// @flow

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from 'client/ducks'

export default function (intialState : mixed = {}) {
  const finalCreateStore = applyMiddleware(
    thunkMiddleware,
    createLogger(),
  )(createStore)

  const store = finalCreateStore(rootReducer, intialState);

  if (module.hot) {
    module.hot.accept('client/ducks', () => {
      const nextReducer = require('client/ducks');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
