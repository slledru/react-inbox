import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Toolbar from './components/toolbar'
import MessageList from './components/message_list'

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
