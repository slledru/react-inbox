import { API_URL, API_ERROR, FETCH_MESSAGES } from '../constants'

async function getMessages() {
  console.log('action getMessages')
  const response = await fetch(API_URL)
  if (response.status === 200) {
    const json = await response.json()
    const newMessages = this.resetSelected(json._embedded.messages)

    return {
      type: FETCH_MESSAGES,
      payload: { messages: newMessages }
    }
  }
  return {
    type: API_ERROR
  }
}

export default getMessages
