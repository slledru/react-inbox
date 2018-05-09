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

  markMessageAsRead = () => {
    console.log('Mark Selected Messages Read')
    this.setState({
      messages: this.state.messages
        .map((message) => {
          if (message.selected) {
            message.read = true
          }
          return message
        })
    })
  }

  markMessageAsUnread = () => {
    console.log('Mark Selected Messages Unread')
    this.setState({
      messages: this.state.messages
        .map((message) => {
          if (message.selected) {
            message.read = false
          }
          return message
        })
    })
  }

  deleteMessage = () => {
    console.log('Delete Selected Messages')
    this.setState({
      messages: this.state.messages.map((message) => {
        if (message.selected) {

        }
        return message
      })
    })
  }

  select = (updated) => {
    console.log('select', updated)
    this.setState({
      messages: this.state.messages.map((message) => {
        if (message.id === updated.id) {
          message.selected = updated.selected
        }
        return message
      })
    })
  }

  star = (message) => {
    console.log('star', message)
  }

  render() {
    console.log('App:render', this.state.messages)
    console.log('App:render - unread: ', this.state.messages.filter((message) => !message.read).length )
    return (
      <div className="App">
        <Toolbar
          unreadMessage={ this.state.messages.filter((message) => !message.read).length }
          messageSelected={ this.state.messages.filter((message) => message.selected).length > 0 }
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
