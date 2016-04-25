// @flow

import React from 'react';
// import styles from './app.scss';
// import 'font-awesome/css/font-awesome.css

const App = (props : any) => {
  const { children } = props;

  return (
    <div>
      <h1>Hello orld</h1>
      <div>
        {children}
      </div>
    </div>
  );
}

export default App;
