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

  renderMessage(message) {
    return (
      <Message key={ message.id }
        message={ message }
        select={ this.props.select }
        star={ this.props.star }/>
    )
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-10">
          { this.state.messages.map((message, index, array) => this.renderMessage(message)) }
        </div>
      </div>
    )
  }
}

export default MessageList
