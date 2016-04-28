
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from 'universal/routes';

export default class Root extends Component {

  static propTypes = {
    history: PropTypes.object,
    store: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func,
  };

  getChildContext() {
    return {
      // Because of https://github.com/kriasoft/isomorphic-style-loader/issues/19 this will
      // insert the server-side rendered styles again. It works in development but is suboptimal
      // for production. To prepare for production: disable it and bundle all styles into one file.
      // Inline server side rendering may be kept as is for above-the-fold styles.
      insertCss: (...styles) => {  styles.forEach(s => s._insertCss()); },
    }
  }

  render() {
    const { history, store } = this.props;

    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}
