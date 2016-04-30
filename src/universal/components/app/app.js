// @flow

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './app.css';
import normalizeStyles from 'universal/styles/normalize.css';

@withStyles(styles, normalizeStyles)
export default class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.app}>
        <h1></h1>
        <h2>This is a subtitle</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div>
          {children}
        </div>
      </div>
    );
  }
}
