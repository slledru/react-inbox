import { FETCH_MESSAGES } from '../constants'

function getMessages(state = {}, action) {
  console.log('getMessages', state, action)
  /* eslint-disable */
  switch (action.type) {
    case FETCH_MESSAGES:
      return {
        ...state
      }
    default:
  }
  /* eslint-enable */
  return state
}

export default getMessages
