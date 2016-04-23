// @flow

import React from 'react';
// import styles from './app.scss';
// import 'font-awesome/css/font-awesome.css

export default function App(props : any) {
  const { children } = props;

  return (
    <div>
      <h1>Hello world</h1>
      <div>
        {children}
      </div>
    </div>
  );
}
