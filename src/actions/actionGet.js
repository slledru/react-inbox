import axios from 'axios'
import { API_URL, FETCH_MESSAGES } from '../constants'

function getMessages() {
  return {
    type: FETCH_MESSAGES,
    payload: axios.get(API_URL)
  }
}

export default getMessages
