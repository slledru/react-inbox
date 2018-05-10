import React, { Component } from 'react'
import './App.css'

import Toolbar from './components/toolbar'
import MessageList from './components/message_list'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: props.messages }
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
        messages: newMessages
      })
    }
  }

  async sendPatchCommand(reqBody) {
    console.log('sendPatchCommand:reqBody', reqBody)
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

  constructLabelBody(label, command) {
    const reqBody = this.state.messages.reduce((acc, message) => {
      if (message.selected) {
        if (!acc.messageIds) {
          acc.messageIds = [ message.id ]
          acc.command = command
          acc.label = label
        }
        else {
          acc.messageIds.push(message.id)
        }
      }
      return acc
    }, {})
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
      messages: newMessages
    })
  }

  markMessages = (read) => {
    return this.state.messages
      .map((message) => {
        if (message.selected) {
          message.read = read
        }
        return message
      })
  }

  markMessageAsRead = () => {
    this.setState({ messages: this.markMessages(true) })
  }

  markMessageAsUnread = () => {
    this.setState({ messages: this.markMessages(false) })
  }

  deleteMessage = () => {
    this.setState({
      messages: this.state.messages.filter((message) => !message.selected)
    })
  }

  select = (updated) => {
    this.setState({
      messages: this.state.messages.map((message) => {
        if (message.id === updated.id) {
          message.selected = updated.selected
        }
        return message
      })
    })
  }

  star = (updated) => {
    this.setState({
      messages: this.state.messages.map((message) => {
        if (message.id === updated.id) {
          message.starred = updated.starred
        }
        return message
      })
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
          selectAllMessage={ this.selectAllMessage }
          deleteMessage={ this.deleteMessage }
          markMessageAsRead = { this.markMessageAsRead }
          markMessageAsUnread = { this.markMessageAsUnread }
        />
        <MessageList messages={ this.state.messages }
          select={ this.select }
          star={ this.star }
        />
      </div>
    )
  }
}

export default App
