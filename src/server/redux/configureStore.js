// @flow

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { LOCATION_CHANGE } from 'react-router-redux';

import rootReducer from 'universal/ducks';
import { loginSuccess } from 'universal/ducks/auth';

const middleware = [
  thunkMiddleware,
];

type ConfigureStoreOptions = {
  location : string,
  authToken : string,
  dependentActions : any[],
}

export default async function configureStore(options : ConfigureStoreOptions) {
  const store = createStore(rootReducer, undefined, applyMiddleware(...middleware));

  store.dispatch({
    type: LOCATION_CHANGE,
    payload: options.location,
  });

  if (options.authToken) {
    store.dispatch(loginSuccess(options.location));
  }

  // Let any data dependencies defined on components complete before continuing rendering
  await Promise.all(options.dependentActions.map(action => store.dispatch(action)));

  return store;
}
