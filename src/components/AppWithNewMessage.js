import React, { Component } from 'react'
import Toolbar from './Toolbar'
import MessageList from './ComposeForm'
import MessageList from './MessageList'
import './App.css'

class AppWithNewMessage extends Component {
  render() {
    const newMessageForm = `col-md-10 ${this.props.toggleForm ? 'show' : 'hide' }`
    return (
      <div className="App">
        <Toolbar />
        <div className="">
          <div className={ newMessageForm }>
            <ComposeForm />
          </div>
        </div>
        <MessageList />
      </div>
    )
  }
}

export default AppWithNewMessage
