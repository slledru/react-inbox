import React, { Component } from 'react'
import './App.css'

import Toolbar from './components/toolbar'
import MessageList from './components/message_list'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: props.messages }
  }

  applyLabel = (label) => {
    console.log('App.applyLabel', label)
  }

  removeLabel = (label) => {
    console.log('App.removeLabel', label)
  }

  selectMessage = (selected) => {
    console.log('Message selected', selected)
  }

  markMessageAsRead = () => {
    console.log('Mark Selected Messages Read')
  }

  markMessageAsUnread = () => {
    console.log('Mark Selected Messages Unread')
  }

  deleteMessage = () => {
    console.log('Delete Selected Messages')
  }

  render() {
    return (
      <div className="App">
        <Toolbar
          applyLabel={ this.applyLabel }
          removeLabel={ this.removeLabel }
          selectMessage={ this.selectMessage }
          deleteMessage={ this.deleteMessage }
          markMessageAsRead = { this.markMessageAsRead }
          markMessageAsUnread = { this.markMessageAsUnread }
        />
      <MessageList messages={ this.state.messages }/>
      </div>
    )
  }
}

export default App
