import axios from 'axios'
import { API_URL, FETCH_MESSAGES } from '../constants'

function getMessages() {
  const request = axios.get(API_URL)
  return {
    type: FETCH_MESSAGES,
    payload: request
  }
}

export default getMessages
