import axios from 'axios'
import { API_URL, ADD_MESSAGE } from '../constants'

function addMessage(subject, body) {
  const request = axios.post(API_URL, { subject, body })
  return {
    type: ADD_MESSAGE,
    payload: request
  }
}

export default addMessage
