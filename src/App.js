import React, { Component } from 'react'
import './App.css'

import Toolbar from './components/toolbar'
import MessageList from './components/message_list'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: props.messages }
  }

  getSelected = () => {
    return this.state.messages.filter((message) => message.selected)
  }

  applyLabel = (label) => {
    console.log('App.applyLabel', label)
    this.setState({
      messages: this.state.messages.map((message) => {
        if (message.selected) {

        }
        return message
      })
    })
  }

  removeLabel = (label) => {
    console.log('App.removeLabel', label)
    this.setState({
      messages: this.state.messages.map((message) => {
        if (message.selected) {

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
    console.log('Delete Selected Messages')
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
    console.log('App:render', this.state.messages)
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
