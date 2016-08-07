import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router/es6';
import routes from 'universal/routes';

class Root extends Component {
  static propTypes = {
    history: PropTypes.object,
    store: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func,
  };

  getChildContext() {
    return {
      // noop: using style-loader/extract-text-plugin for client side styles
      insertCss() { },
    };
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

export default Root;
