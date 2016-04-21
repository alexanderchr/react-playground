// // @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'

import configureStore from 'client/redux/configureStore'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

var mount = document.getElementById('mount')

renderApp = () => {
  const App = require('client/components/app/app').default
  return <App store={store} history={history} />
}

ReactDOM.render((
  <AppContainer component={renderApp} />
), mount)

if (module.hot) {
  module.hot.accept('client/components/app/app', () => {
    ReactDOM.render((
      <AppContainer component={renderApp} />
    ), mount)
  })
}

// const createElement = React.createElement
//
// React.createElement = function patchedCreateElement(type : any, props : any, children: any) {
//   console.log('creating', type.name)
//
//   for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
//   args[_key - 2] = arguments[_key];
// }
//   return createElement.apply(null, [type, props].concat(args))
// }
//
// var mount = document.getElementById('mount')
//
// class Something extends React.Component {
//   state = {
//     what: 'no'
//   };
//
//   componentWillMount() {
//     this.setState({ what: this.state.what + 1 })
//     console.log('will mount')
//   }
//
//   render() {
//     console.log(this.state)
//     return(
//       <div>WHUT {this.state.what}</div>
//     )
//   }
// }
//
// // ReactDOM.render((
// //   <Something prop={3} />
// // ), mount)
// //
// ReactDOM.render((
//   <Something prop={3} />
// ), mount)
//
// console.log('rendered once')
//
// setTimeout(() =>
//   ReactDOM.render((
//     <Something prop={2} />
//   ), mount), 1000)
