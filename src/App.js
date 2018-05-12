import React, { Component } from 'react'
import './App.css'

import Toolbar from './components/Toolbar'
import MessageList from './components/MessageList'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages,
      composeClass: 'hide'
    }
  }

  resetSelected(newMessages) {
    if (this.state.messages) {
      return newMessages.map((message) => {
        const found = this.state.messages.filter((old) => message.id === old.id && old.selected)
        message.selected = false
        if (found.length > 0) {
          message.selected = true
        }
        return message
      })
    }
    return newMessages
  }

  async componentDidMount() {
    const response = await fetch(`/api/messages`)
    if (response.status === 200) {
      const json = await response.json()
      const newMessages = this.resetSelected(json._embedded.messages)
      this.setState({
        ...this.state,
        messages: newMessages
      })
    }
  }

  async sendPatchCommand(reqBody) {
    console.log('sendPatchCommand:reqBody', reqBody)
    if (reqBody.command) {
      const response = await fetch(`/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      if (response.status === 200) {
        await this.componentDidMount()
      }
    }
  }

  constructBody(command) {
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

  constructLabelBody(label, command) {
    const reqBody = this.constructBody(command)
    if (reqBody.command) {
      reqBody.label = label
    }
    return reqBody
  }

  applyLabel = (label) => {
    const reqBody = this.constructLabelBody(label, 'addLabel')
    this.sendPatchCommand(reqBody)
  }

  removeLabel = (label) => {
    const reqBody = this.constructLabelBody(label, 'removeLabel')
    this.sendPatchCommand(reqBody)
  }

  selectAllMessage = (selected) => {
    const newMessages = this.state.messages.map((message) => {
      message.selected = selected
      return message
    })
    this.setState({
      ...this.state,
      messages: newMessages
    })
  }

  markMessages = (read) => {
    const reqBody = this.constructBody('read')
    reqBody.read = read
    return reqBody
  }

  markMessageAsRead = () => {
    const reqBody = this.markMessages(true)
    this.sendPatchCommand(reqBody)
  }

  markMessageAsUnread = () => {
    const reqBody = this.markMessages(false)
    this.sendPatchCommand(reqBody)
  }

  deleteMessage = () => {
    const reqBody = this.constructBody('delete')
    this.sendPatchCommand(reqBody)
  }

  addMessage = async (message) => {
    const response = await fetch(`/api/messages`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    if (response.status === 200) {
      await this.componentDidMount()
    }
    this.setState({
      ...this.state,
      formToggle: !this.state.formToggle
    })
  }

  select = (updated) => {
    this.setState({
      ...this.state,
      messages: this.state.messages.map((message) => {
        if (message.id === updated.id) {
          message.selected = updated.selected
        }
        return message
      })
    })
  }

  star = (message) => {
    const reqBody = {
      messageIds: [ message.id ],
      command: 'star',
      star: message.starred
    }
    this.sendPatchCommand(reqBody)
  }

  toggleComposeForm = (show) => {
    this.setState({
      ...this.state,
      formToggle: show
    })
  }

  render() {
    if (!this.state.messages) {
      return <div>Loading...</div>
    }
    return (
      <div className="App">
        <Toolbar
          messages={ this.state.messages }
          applyLabel={ this.applyLabel }
          removeLabel={ this.removeLabel }
          toggleComposeForm= { this.toggleComposeForm }
          formToggle={ this.state.formToggle }
          selectAllMessage={ this.selectAllMessage }
          deleteMessage={ this.deleteMessage }
          markMessageAsRead = { this.markMessageAsRead }
          markMessageAsUnread = { this.markMessageAsUnread }
        />
        <MessageList
          messages={ this.state.messages }
          formToggle={ this.state.formToggle }
          select={ this.select }
          star={ this.star }
          addMessage = { this.addMessage }
        />
      </div>
    )
  }
}

export default App
