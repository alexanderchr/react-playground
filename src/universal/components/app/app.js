// @flow

import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './app.css';
import normalizeStyles from 'universal/styles/normalize.css';

import Header from 'universal/components/header/header';

@connect(
  state => ({ currentUser: state.auth.get('currentUser') })
)
@withStyles(styles, normalizeStyles)
export default class App extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.app}>
        <Header />
        <Main>
          {children}
        </Main>
      </div>
    );
  }
}

const Main = ({ children }) =>
  <main className={styles.main}>
    <section className={styles.content}>
      {children}
    </section>
  </main>
