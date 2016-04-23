
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from 'universal/routes';

export default function Root({ history, store }) {
  return (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );
}

Root.propTypes = {
  history: PropTypes.object,
  store: PropTypes.object,
};
