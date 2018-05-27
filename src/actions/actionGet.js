import axios from 'axios'
import { API_URL, FETCH_MESSAGES, FETCH_MESSAGE } from '../constants'

function getMessages() {
  return {
    type: FETCH_MESSAGES,
    payload: axios.get(API_URL)
  }
}

function getMessage(message) {
  return {
    type: FETCH_MESSAGE,
    payload: axios.get(`${API_URL}/${message.id}`)
  }
}

export {
  getMessages,
  getMessage
}
