import { API_URL, SELECT_MESSAGE } from '../constants'
import getMessages from '../actions/actionGet'

async function sendPatchCommand(reqBody) {
  console.log('sendPatchCommand:reqBody', reqBody)
  if (reqBody.command) {
    const response = await fetch(API_URL, {
      method: 'PATCH',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    if (response.status === 200) {
      return getMessages()
    }
    else {
      console.log('Something bad happened when adding part')
    }
  }
  console.log('sendPatchCommand:exits')
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
  return sendPatchCommand(body)
}

function removeLabel(label) {
  const body = constructLabelBody(label, 'removeLabel')
  return sendPatchCommand(body)
}

function starMessage(message) {
  const body = {
    messageIds: [ message.id ],
    command: 'star',
    star: !message.starred
  }
  return sendPatchCommand(body)
}

function selectMessage(id) {
  console.log('selectMessage', id)
  return {
    type: SELECT_MESSAGE,
    payload: id
  }
}

export { applyLabel, removeLabel, starMessage, selectMessage }
