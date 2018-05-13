import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'font-awesome/css/font-awesome.css'
import '../index.css'
import '../App.css'
import '../inbox.css'

import React, { Component } from 'react'
import Message from './Message'
import ComposeForm from './ComposeForm'

class MessageList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: props.messages,
      formToggle: props.formToggle
    }
  }

  // this is called when property changes
  componentWillReceiveProps = (newProps) => {
    this.setState({
      messages: newProps.messages,
      formToggle: newProps.formToggle
    })
  }

  renderMessage = (message) => {
    return (
      <Message key={ message.id }
        message={ message }
        select={ this.props.select }
        star={ this.props.star }/>
    )
  }

  render = () => {
    const newMessageForm = `col-md-10 ${this.state.formToggle ? 'show' : 'hide' }`
    return (
      <div className="row">
        <div className={ newMessageForm }>
          <ComposeForm addMessage = { this.props.addMessage } />
        </div>
        <div className="col-md-10">
          { this.state.messages.map(this.renderMessage) }
        </div>
      </div>
    )
  }
}

export default MessageList