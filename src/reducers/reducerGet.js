import { FETCH_MESSAGES } from '../constants'

function getMessages(state = null, action) {
  console.log('reducer:getMessages', action)
  /* eslint-disable */
  switch (action.type) {
    case FETCH_MESSAGES:
      console.log('fetch messages')
      return [ ...action.payload.data._embedded.messages ]
    default:
  }
  /* eslint-enable */
  return state
}

export default getMessages
