import { FETCH_MESSAGES, FETCH_MESSAGE } from '../constants'

function getMessages(state = null, action) {
  /* eslint-disable */
  switch (action.type) {
    case FETCH_MESSAGES:
      const mappedKey = action.payload.data._embedded.messages.reduce((acc, msg) => {
        acc[msg.id] = msg
        return acc
      }, {})
      return mappedKey

    case FETCH_MESSAGE:
      //console.log(action.payload.data)
      const newData = {}
      newData[action.payload.data.id] = { ...action.payload.data }
      return {
        ...state,
        ...newData
      }
    default:
  }
  /* eslint-enable */
  return state
}

export default getMessages
