import { FETCH_MESSAGES } from '../constants'

function getMessages(state = null, action) {
  /* eslint-disable */
  switch (action.type) {
    case FETCH_MESSAGES:
      return [ ...action.payload.data._embedded.messages ]
    default:
  }
  /* eslint-enable */
  return state
}

export default getMessages
