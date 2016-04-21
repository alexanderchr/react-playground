// @flow

// react
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

// redux
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

// react-router(-redux)
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

// app
import App from './components/app/app'

const finalCreateStore = applyMiddleware(
  thunkMiddleware,
  createLogger(),
)(createStore)

const store = finalCreateStore(require('./ducks').default)
const history = syncHistoryWithStore(browserHistory, store)

var mount = document.getElementById('mount')

ReactDOM.render((
  <AppContainer component={App} />
), mount)

if (module.hot) {
  module.hot.accept('./components/app/app', () => {
    ReactDOM.render((
      <AppContainer component={require('./components/app/app').default} />
    ), mount)
  })
}

