// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { LOCATION_CHANGE } from 'react-router-redux';

import rootReducer from 'universal/ducks';
import { loginSuccess } from 'universal/ducks/auth';

const middleware = [
  thunkMiddleware
];

async function configureStore(location : string, authToken : string) {
  const store = createStore(rootReducer, undefined, applyMiddleware(...middleware));

  store.dispatch({
    type: LOCATION_CHANGE,
    payload: location,
  });

  if (authToken) {
    store.dispatch(loginSuccess(authToken))
  }

  return store;
}

export default configureStore;
