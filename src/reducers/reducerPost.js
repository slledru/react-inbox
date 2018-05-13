import { ADD_MESSAGE, TOGGLE_FORM } from '../constants'

function addMessage(state = {}, action) {
  console.log('addMessage', state, action)
  /* eslint-disable */
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state
      }
    case TOGGLE_FORM:
      return {
        ...state,
        toggleForm: !state.toggleForm
      }
    default:
  }
  /* eslint-enable */
  return state
}

export default addMessage
