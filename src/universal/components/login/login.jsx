// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routerShape } from 'react-router';
import { compose, withState, withHandlers } from 'recompose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './login.css';

import { login } from 'universal/ducks/auth'

const Login = ({ email, password, pending, errors, onEmailChange, onPasswordChange, onSubmit }) => (
  <div className={styles.login}>
    <form className={styles.form} onSubmit={onSubmit}>
      <label>Email</label>
      <input type='email' value={email} onChange={onEmailChange} />
      <label>Password</label>
      <input type='text' value={password} onChange={onPasswordChange} />
      <button disabled={pending}>Login</button>
    </form>
    {pending ? <p>Logging you in...</p> : undefined}
    <ul>
      {errors && errors.map((x, i) => <li key={i} className={styles.error}>{x.get('message')}</li>)}
    </ul>
  </div>
);

export default compose(
  connect(
    (state) => ({ errors: state.auth.get('errors'), pending: state.auth.get('pending') }),
    { login }
  ),
  withState('email', 'setEmail', ''),
  withState('password', 'setPassword', ''),
  withHandlers({
    onEmailChange: (props) => (e) => {
      props.setEmail(e.target.value);
    },
    onPasswordChange: (props) => (e) => {
      props.setPassword(e.target.value);
    },
    onSubmit: (props) => (e) => {
      e.preventDefault();
      const { email, password } = props;
      props.login(email, password);
    },
  }),
  withStyles(styles),
)(Login)
