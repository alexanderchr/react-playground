// @flow

import { Map, fromJS } from 'immutable';
import { push } from 'react-router-redux';

const LOGIN = 'time-tracker/auth/LOGIN';
const LOGIN_SUCCESS = 'time-tracker/auth/LOGIN_SUCCESS';
const LOGIN_ERROR = 'time-tracker/auth/LOGIN_ERROR';
const LOGOUT = 'time-tracker/auth/LOGOUT';

import fetchGraphql from 'universal/utility/fetchGraphql';

export default function auth(state : Map = new Map(), action : any) {
  switch (action.type) {
    case LOGIN:
      return state.merge({ pending: true, error: false });

    case LOGIN_SUCCESS:
      return state.merge({ pending: false, error: false, token: action.payload.token });

    case LOGIN_ERROR:
      return state.merge({ pending: false, error: fromJS(action.payload) });

    case LOGOUT:
      return state.merge({ pending: false, error: false, token: undefined });

    default:
      return state;
  }
}

export function logout() {
  return (dispatch : () => {}) => {
    if (document && typeof(document.cookie) !== undefined) {
      document.cookie = 'token=';
    }

    dispatch({ type: LOGOUT });
    dispatch(push('/login'));
  };
}

export function loginSuccess(token : string) {
  return {
    type: LOGIN_SUCCESS,
    payload: { token },
  };
}

export function login(email : string, password : string) {
  return async (dispatch : any) => {
    dispatch({
      type: LOGIN,
    });

    const query = `
      query($email : String!, $password : String!) {
        login(email: $email, password: $password) {
          token
        }
      }`;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const result = await fetchGraphql(query, { email, password });

    if (result.errors && result.errors.length > 0) {
      dispatch({
        type: LOGIN_ERROR,
        error: true,
        payload: result.errors,
      });
    } else {
      const { token } = result.data.login;

      // This has a few major issues:
      // 1. It's unsecure
      // 2. It does not expire
      if (document && typeof(document.cookie) !== undefined) {
        document.cookie = `token=${token}`;
      }

      dispatch(loginSuccess(token));
      dispatch(push('/'));
    }
  };
}
