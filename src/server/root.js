import React, { Component, PropTypes } from 'react';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

class Root extends Component {
  static propTypes = {
    store: PropTypes.object,
    renderProps: PropTypes.object,
    insertCss: PropTypes.func,
  };

  static childContextTypes = {
    insertCss: PropTypes.func,
  };


  getChildContext = () => ({
    insertCss: this.props.insertCss,
  });

  render() {
    const { store, renderProps } = this.props;

    return (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );
  }
}

export default Root;
