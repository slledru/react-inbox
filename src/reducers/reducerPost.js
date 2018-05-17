import { OPEN_FORM } from '../constants'

function addMessage(state = false, action) {
  /* eslint-disable */
  switch (action.type) {
    case OPEN_FORM:
      return !state
    default:
  }
  /* eslint-enable */
  return state
}

export default addMessage
