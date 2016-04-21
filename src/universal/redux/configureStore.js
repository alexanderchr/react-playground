// @flow

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import rootReducer from 'universal/ducks'

export default function (intialState : mixed = {}) {
  const finalCreateStore = applyMiddleware(
    thunkMiddleware,
    createLogger(),
  )(createStore)

  const store = finalCreateStore(rootReducer, intialState);

  if (module.hot) {
    module.hot.accept('universal/ducks', () => {
      const nextReducer = require('universal/ducks');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
