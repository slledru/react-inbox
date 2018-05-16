import { API_URL, SELECT_MESSAGE, SELECT_ALL_MESSAGES, CLEAR_SELECTION } from '../constants'
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

function constructBody(selected, command) {
  const reqBody = {
    command: command,
    messageIds: [ ...selected ]
  }
  return reqBody
}

function constructLabelBody(label, selected, command) {
  const reqBody = constructBody(selected, command)
  reqBody.label = label
  return reqBody
}

function applyLabel(label, selected) {
  const body = constructLabelBody(label, selected, 'addLabel')
  return sendPatchCommand(body)
}

function removeLabel(label, selected) {
  const body = constructLabelBody(label, selected, 'removeLabel')
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
  return {
    type: SELECT_MESSAGE,
    payload: id
  }
}

function selectAllMessages(messages, selectedList) {
  const all = messages.length === selectedList.length
  return {
    type: SELECT_ALL_MESSAGES,
    payload: all ? [] : messages.map((message => message.id))
  }
}

function clearSelection() {
  return {
    type: CLEAR_SELECTION
  }
}

function markAsRead(selectedList) {
  const body = constructBody(selectedList, 'read')
  body.read = true
  return sendPatchCommand(body)
}

function markAsUnread(selectedList) {
  const body = constructBody(selectedList, 'read')
  body.read = false
  return sendPatchCommand(body)
}

function deleteMessages(selectedList) {
  const body = constructBody(selectedList, 'delete')
  return sendPatchCommand(body)
}

export {
  applyLabel,
  removeLabel,
  starMessage,
  selectMessage,
  selectAllMessages,
  markAsRead,
  markAsUnread,
  deleteMessages,
  clearSelection
}
