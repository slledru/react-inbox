import React, { Component } from 'react'
import './App.css'

import Toolbar from './components/toolbar'
import MessageList from './components/message_list'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: props.messages }
  }

  async componentDidMount() {
    const response = await fetch(`/api/messages`)
    if (response.status === 200) {
      const json = await response.json()
      this.setState({
        messages: json._embedded.messages
      })
    }
  }

  applyLabel = (label) => {
    this.setState({
      messages: this.state.messages.map((message) => {
        if (message.selected) {
          if (!message.labels.includes(label)) {
            message.labels = [ ...message.labels, label ]
          }
        }
        return message
      })
    })
  }

  removeLabel = (input) => {
    this.setState({
      messages: this.state.messages.map((message) => {
        if (message.selected) {
          message.labels = message.labels.filter((label) => label !== input)
        }
        return message
      })
    })
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
