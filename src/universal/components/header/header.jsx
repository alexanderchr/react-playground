// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { compose } from 'recompose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { logout as logoutThunk } from 'universal/ducks/auth';
import styles from './header.css';

export const Header = (props : { loggedIn: boolean, logout: Function }) =>
  <header className={styles.header}>
    <div className={styles['header-extension']} />
    <h1 className={styles.logo}>
      <Link to='/'>react-playground</Link>
    </h1>
    <Menu loggedIn={props.loggedIn} logout={props.logout} />
  </header>

const Menu = (props : { loggedIn: boolean, logout: Function }) =>
  <ul className={styles.menu}>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/users'>Users</Link></li>
    <li>
      {props.loggedIn
        ? <Link to='/login' onClick={props.logout}>Logout</Link>
        : <Link to='/login'>Login</Link>}
    </li>
  </ul>

const mapStateToProps = state => ({ loggedIn: !!state.auth.get('token') });
const enhance = compose(withStyles(styles), connect(mapStateToProps, { logout: logoutThunk }));

export default enhance(Header);
