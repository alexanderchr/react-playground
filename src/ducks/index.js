import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import reports from './reports'

export default combineReducers({
  reports,
  routing: routerReducer
})
