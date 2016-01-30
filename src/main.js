// react
import React from 'react'
import ReactDOM from 'react-dom'

// redux
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

// app
import reducers from './reducers'
import App from './components/app'
 
const finalCreateStore = applyMiddleware(
  thunkMiddleware,
  createLogger()
)(createStore)

const store = finalCreateStore(reducers)

var mount = document.getElementById('mount')
ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), mount)

