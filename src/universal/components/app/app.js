// @flow
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import routes from 'universal/routes'
import styles from './app.scss'
// import 'font-awesome/css/font-awesome.css

export default class App extends Component {
  render() {
    const { store, history } = this.props

    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
        </div>
      </Provider>
    )
  }
}
