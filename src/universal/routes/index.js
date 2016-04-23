// @flow

import React from 'react';

import App from 'universal/components/app/app';

const Nested = () => (
  <p>I'd!</p>
);

const Other = () => (
  <p>sas</p>
);

const NestedRoute = {
  path: 'nested',
  components: {
    a: Nested,
    b: Other,
  },
};

const IndexRoute = {
  path: '/',
  component: App,
  childRoutes: [NestedRoute],
};

const OtherRoute = {
  path: '/other',
  component: Other,
};

export default [IndexRoute, OtherRoute];
