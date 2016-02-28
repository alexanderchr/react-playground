import { List, Map } from 'immutable'
import { CREATE_VERIFICATION_SUCCESS } from '../actions/verifications'

export default function(state = List(), action) {
  switch (action.type) {
    case CREATE_VERIFICATION_SUCCESS:
      return state.push(Map({ id: action.id, title: action.title, date: action.date, amount: action.amount }))

    default:
      return state
  }
}
