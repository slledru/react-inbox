import React, { Component } from 'react'
import Toolbar from './Toolbar'
import ComposeForm from './ComposeForm'
import MessageList from './MessageList'
import './App.css'

class AppWithNewMessage extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar toggle={ false }/>
        <div className="">
          <div className="col-md-10">
            <ComposeForm />
          </div>
        </div>
        <MessageList />
      </div>
    )
  }
}

export default AppWithNewMessage
