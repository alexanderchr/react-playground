
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
      insertCss: (styles) => {  styles._insertCss(); },
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
