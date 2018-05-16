import { SELECT_MESSAGE, SELECT_ALL_MESSAGES, CLEAR_SELECTION } from '../constants'

function selectMessage(state = [], action) {
  /* eslint-disable */
  switch (action.type) {
    case SELECT_MESSAGE:
      if (state.includes(action.payload)) {
        return state.filter((id) => id !== action.payload)
      }
      return [ ...state, action.payload ]
    case SELECT_ALL_MESSAGES:
      return [ ...action.payload ]
    case CLEAR_SELECTION:
      return []
    default:
  }
  /* eslint-enable */
  return state
}

export default selectMessage
