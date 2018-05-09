import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'font-awesome/css/font-awesome.css'
import '../index.css'
import '../App.css'
import '../inbox.css'

import React, { Component } from 'react'
import Message from './message'

class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: props.messages }
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          { this.state.messages.map((message) => <Message key={ message.id } message={ message }/>)}
        </div>
      </div>
    )
  }
}

export default MessageList
