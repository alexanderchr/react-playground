import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

var reducers = combineReducers({
  routing: routerReducer
})

export default reducers
