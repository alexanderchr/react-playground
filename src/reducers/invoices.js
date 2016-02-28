import { Map } from 'immutable'

import { CREATE_INVOICE } from '../actions/invoices'
import { CREATE_VERIFICATION } from '../actions/verifications'

export default function(state = Map({ count: 4 }), action) {
  switch(action.type) {
    case CREATE_VERIFICATION:
      return state.set('count', state.get('count') + 1)

    default:
      return state
  }

}
