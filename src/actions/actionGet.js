import axios from 'axios'
import { API_URL, API_ERROR, FETCH_MESSAGES, FETCH_MESSAGE } from '../constants'

function getMessages() {
  return {
    type: FETCH_MESSAGES,
    payload: axios.get(API_URL)
  }
}

const getMessage = async (message) => {
  const reqBody = {
    command: 'read',
    messageIds: [ message.id ],
    read: true
  }
  const response = await fetch(API_URL, {
    method: 'PATCH',
    body: JSON.stringify(reqBody),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  if (response.status === 200) {
    return {
      type: FETCH_MESSAGE,
      payload: axios.get(`${API_URL}/${message.id}`)
    }
  }
  else {
    return {
      type: API_ERROR,
      payload: 'Something bad happened when adding part'
    }
  }
}

export {
  getMessages,
  getMessage
}
