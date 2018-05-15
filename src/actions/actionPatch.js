import axios from 'axios'
import { API_URL, APPLY_LABEL, REMOVE_LABEL,
  STAR_MESSAGE, SELECT_MESSAGE } from '../constants'

function sendPatchCommand(reqBody) {
  console.log('sendPatchCommand:reqBody', reqBody)
  if (reqBody.command) {
    return axios.patch(API_URL, reqBody)
  }
  return null
}

function constructBody(command) {
  const reqBody = this.state.messages.reduce((acc, message) => {
    if (message.selected) {
      if (!acc.messageIds) {
        acc.messageIds = [ message.id ]
        acc.command = command
      }
      else {
        acc.messageIds.push(message.id)
      }
    }
    return acc
  }, {})
  return reqBody
}

function constructLabelBody(label, command) {
  const reqBody = constructBody(command)
  if (reqBody.command) {
    reqBody.label = label
  }
  return reqBody
}

function applyLabel(label) {
  const body = constructLabelBody(label, 'addLabel')
  return {
    type: APPLY_LABEL,
    payload: sendPatchCommand(body)
  }
}

function removeLabel(label) {
  const body = constructLabelBody(label, 'removeLabel')
  return {
    type: REMOVE_LABEL,
    payload: sendPatchCommand(body)
  }
}

function starMessage(message) {
  const body = {
    messageIds: [ message.id ],
    command: 'star',
    star: message.starred
  }
  return {
    type: STAR_MESSAGE,
    message: message,
    payload: sendPatchCommand(body)
  }
}

function selectMessage(id) {
  console.log('selectMessage', id)
  return {
    type: SELECT_MESSAGE,
    payload: id
  }
}

export { applyLabel, removeLabel, starMessage, selectMessage }
