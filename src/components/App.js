import React from 'react'
import Toolbar from './Toolbar'
import MessageList from './MessageList'
import './App.css'

const App = (props) => {
  return (
    <div className="App">
      <Toolbar toggle={ props.toggle }/>
      <MessageList toggle={ props.toggle } selectedId={ props.selectedId }/>
    </div>
  )
}

export default App
