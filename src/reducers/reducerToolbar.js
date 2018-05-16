import { SELECT_MESSAGE } from '../constants'

function selectMessage(state = [], action) {
  /* eslint-disable */
  switch (action.type) {
    case SELECT_MESSAGE:
      if (state.includes(action.payload)) {
        return state.filter((id) => id !== action.payload)
      }
      return [ ...state, action.payload ]
    default:
  }
  /* eslint-enable */
  return state
}

export default selectMessage
