import { API_URL, API_ERROR, ADD_MESSAGE } from '../constants'

async function addMessage(subject, body) {
  console.log('action addMessage')
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({ subject, body }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  if (response.status === 200) {
    return {
      type: ADD_MESSAGE,
      payload: { subject, body }
    }
  }
  return {
    type: API_ERROR
  }
}

export default addMessage
