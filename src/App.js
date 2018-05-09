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
    console.log('All Message selected', selected)
    const newMessages = this.state.messages.map((message) => {
      message.selected = selected
      return message
    })
    console.log('All Message selected', newMessages)
    this.setState({
      messages: newMessages
    })
  }

  markMessageAsRead = () => {
    console.log('Mark Selected Messages Read')
    this.setState({
      messages: this.state.messages.map((message) => {
        if (message.selected) {

        }
        return message
      })
    })
  }

  markMessageAsUnread = () => {
    console.log('Mark Selected Messages Unread')
    this.setState({
      messages: this.state.messages.map((message) => {
        if (message.selected) {

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

  select = (message) => {
    console.log('select', message)
  }

  star = (message) => {
    console.log('star', message)
  }

  render() {
    console.log('App:render')
    return (
      <div className="App">
        <Toolbar
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
