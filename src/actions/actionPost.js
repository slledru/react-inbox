import { API_URL, API_ERROR } from '../constants'
import getMessages from '../actions/actionGet'

async function sendPostCommand(body) {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  if (response.status === 200) {
    return getMessages()
  }
  else {
    return {
      type: API_ERROR,
      payload: 'Something bad happened when adding part'
    }
  }
}

function addMessage(subject, body) {
  return sendPostCommand({ subject, body })
}

export { addMessage }
