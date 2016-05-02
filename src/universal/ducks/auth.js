// @flow

import { Record, List, fromJS } from 'immutable';
import { push } from 'react-router-redux';

import fetchGraphql from 'universal/utility/fetchGraphql';

const ActionTypes = {
  LOGIN: 'time-tracker/auth/LOGIN',
  LOGIN_SUCCESS: 'time-tracker/auth/LOGIN_SUCCESS',
  LOGIN_ERROR: 'time-tracker/auth/LOGIN_ERROR',
  LOGOUT: 'time-tracker/auth/LOGOUT',
};

type AuthShape = Record<{
  token? : string,
  errors : List<string>,
  pending : boolean,
}>;

const AuthRecord : any = Record({
  token: undefined,
  errors : List(),
  pending: false
});

function reducer(state : AuthShape = AuthRecord(), action : any) : AuthShape {
  switch(action.type) {
    case ActionTypes.LOGIN:
      return new AuthRecord({ pending: true });

    case ActionTypes.LOGOUT:
      return new AuthRecord();

    case ActionTypes.LOGIN_SUCCESS:
      return new AuthRecord({ token: action.payload.token });

    case ActionTypes.LOGIN_ERROR:
      return new AuthRecord({ errors: action.payload });

    default:
      return state;
  }
}

function loginSuccess(token : string) {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    payload: {
      token,
    },
  };
}

function loginError(errors : List<string>) {
  return {
    type: ActionTypes.LOGIN_ERROR,
    payload: errors,
  };
}

function login(email : string, password : string) {
  return async (dispatch : Function) => {
    dispatch({
      type: ActionTypes.LOGIN,
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
      dispatch(loginError(fromJS(result.errors)));
    } else {
      const token : string = result.data.login.token;

      // This has a few major issues:
      // 1. It's unsecure
      // 2. It does not expire
      // 3. It's bad
      if (document && typeof(document.cookie) !== undefined) {
        document.cookie = `token=${token}`;
      }

      dispatch(loginSuccess(token));
      dispatch(push('/'));
    }
  }
}


function logout() {
  return (dispatch : any) => {
    if (document && typeof(document.cookie) !== undefined) {
      document.cookie = 'token=';
    }

    dispatch({ type: ActionTypes.LOGOUT });
  };
}

export type { AuthShape };
export { ActionTypes };
export { login, logout, loginSuccess, loginError };
export default reducer;
