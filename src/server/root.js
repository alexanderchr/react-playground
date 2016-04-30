import React, { PropTypes } from 'react';
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';

class Root extends Component {
  getChildContext = () => ({
    insertCss: this.props.insertCss,
  });

  static childContextTypes = {
    insertCss: PropTypes.func,
  };

  render() {
    const { store, renderProps, insertCss } = this.props;

    return (
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    );
  }
}

export default Root;
