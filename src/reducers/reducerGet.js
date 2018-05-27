import { FETCH_MESSAGES } from '../constants'

function getMessages(state = null, action) {
  /* eslint-disable */
  switch (action.type) {
    case FETCH_MESSAGES:
      const mappedKey = action.payload.data._embedded.messages.reduce((acc, msg) => {
        acc[msg.id] = msg
        return acc
      }, {})
      return mappedKey
    default:
  }
  /* eslint-enable */
  return state
}

export default getMessages
