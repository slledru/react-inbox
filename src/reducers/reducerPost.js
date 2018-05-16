import { ADD_MESSAGE, OPEN_FORM } from '../constants'

function addMessage(state = false, action) {
  /* eslint-disable */
  switch (action.type) {
    case ADD_MESSAGE:
      console.log('addMessage', state, action)
      return false
    case OPEN_FORM:
      return !state
    default:
  }
  /* eslint-enable */
  return state
}

export default addMessage
