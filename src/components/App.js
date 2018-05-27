import React, { Component } from 'react'
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <MessageList />
      </div>
    )
  }
}

export default App