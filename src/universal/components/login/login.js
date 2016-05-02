// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './login.css';

import { login } from 'universal/ducks/auth'

@connect(
  (state) => ({ errors: state.auth.get('errors'), pending: state.auth.get('pending') }),
  { login }
)
@withStyles(styles)
class Login extends Component {
  state : { email : string, password : string } = {
    email: '',
    password: '',
  };

  handleSubmit : (e : any) => void = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.login(email, password);
  };

  setEmail : (e : any) => void = (e) => {
    this.setState({ email: e.target.value });
  };

  setPassword : (e : any) => void = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className={styles.login}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label>Email</label>
          <input type='email' onChange={this.setEmail} />
          <label>Password</label>
          <input type='text' onChange={this.setPassword} />
          <button disabled={this.props.pending}>Login</button>
        </form>
        {this.props.pending ? <p>Logging you in...</p> : undefined}
        <ul>
          {this.props.errors && this.props.errors.map((x, i) => <li key={i} className={styles.error}>{x.get('message')}</li>)}
        </ul>
      </div>
    )
  }
}

export default Login;
