// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { logout } from 'universal/ducks/auth';
import styles from './header.css';

@withStyles(styles)
@connect(
  state => ({ loggedIn: !!state.auth.get('token') }),
  { logout }
)
class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles['header-extension']}></div>
        <h1 className={styles.logo}>
          <Link to='/'>react-playground</Link>
        </h1>
        <Menu loggedIn={this.props.loggedIn} logout={this.props.logout} />
      </header>
    )
  }
}

const Menu = ({ loggedIn, logout } : { loggedIn : boolean, logout : () => {} }) =>
  <nav className={styles.menu}>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/reports'>Reports</Link></li>
      <li>
        {loggedIn
          ? <Link to='/login' onClick={logout}>Logout</Link>
          : <Link to='/login'>Login</Link>}
      </li>
    </ul>
  </nav>

export default Header;
