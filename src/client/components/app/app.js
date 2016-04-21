import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
// import moment from 'moment'

import styles from './app.scss'
// import 'font-awesome/css/font-awesome.css'

export default class App extends React.Component {
  render() {
    return (
      <div className={styles.app}>
        <div>
          <h1>Hello world</h1>
        </div>

        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
