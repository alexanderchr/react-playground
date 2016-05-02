// @flow

import App from 'universal/components/app/app';
import Login from 'universal/components/login/login';

const LoginRoute = {
  path: 'login',
  component: Login,
};

const IndexRoute = {
  path: '/',
  component: App,
  childRoutes: [LoginRoute],
};

export default [IndexRoute];
