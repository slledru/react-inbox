import React, { Component } from 'react'
import './App.css'

import Toolbar from './components/toolbar'
import MessageList from './components/message_list'

class App extends Component {
  applyLabel = (label) => {
    console.log('App.applyLabel', label)
  }

  removeLabel = (label) => {
    console.log('App.removeLabel', label)
  }

  render() {
    return (
      <div className="App">
        <Toolbar
          applyLabel={ this.applyLabel }
          removeLabel={ this.removeLabel }
        />
        <MessageList />
      </div>
    )
  }
}

export default App
