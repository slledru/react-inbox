import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'font-awesome/css/font-awesome.css'
import '../index.css'
import '../App.css'
import '../inbox.css'

import React, { Component } from 'react'

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apply: '',
      remove: '',
      formToggle: props.formToggle,
      messages: props.messages,
      messageSelected: props.messages.filter((message) => message.selected).length > 0
    }
  }

  // this is called when property changes
  componentWillReceiveProps(newProps){

    this.setState({
      ...this.state,
      formToggle: newProps.formToggle,
      messages: newProps.messages,
      messageSelected: newProps.messages.filter((message) => message.selected).length > 0
    })
  }

  onApplyLabel = (event) => {
    event.preventDefault()
    this.props.applyLabel(event.target.value)
    this.setState({ ...this.state, remove: '', apply: event.target.value })
  }

  onRemoveLabel = (event) => {
    event.preventDefault()
    this.props.removeLabel(event.target.value)
    this.setState({ ...this.state, apply: '', remove: event.target.value })
  }

  onMessageSelected = (event) => {
    event.preventDefault()
    this.setState({ ...this.state, messageSelected: !this.state.messageSelected })
    this.props.selectAllMessage(!this.state.messageSelected)
  }

  onMessageDelete = (event) => {
    event.preventDefault()
    this.props.deleteMessage()
  }

  onMarkMessageAsRead = (event) => {
    event.preventDefault()
    this.props.markMessageAsRead()
  }

  onMarkMessageAsUnread = (event) => {
    event.preventDefault()
    this.props.markMessageAsUnread()
  }

  onNewMessage = (event) => {
    event.preventDefault()
    this.props.toggleComposeForm(!this.state.formToggle)
  }

  getMessageCount = () => {
    return this.state.messages.length
  }

  getUnreadMessageCount = () => {
    return this.state.messages.filter((message) => !message.read).length
  }

  getSelectedMessageCount = () => {
    return this.state.messages.filter((message) => message.selected).length
  }

  getSelectImage = () => {
    let image = (<i className="far fa-square"></i>)
    if (this.getSelectedMessageCount() > 0) {
      if (this.getSelectedMessageCount() === this.getMessageCount()) {
        image = (<i className="fa fa-check-square-o"></i>)
      }
      else {
        image = (<i className="fa fa-minus-square-o"></i>)
      }
    }
    return image
  }

  render() {
    const disabledAttribute = (this.getMessageCount() <= 0)
    return (
      <div className="row toolbar">
        <div className="col-md-11">
          <p className="pull-right">
            <span className="badge badge">{ this.getUnreadMessageCount() }</span>
            { this.getUnreadMessageCount() === 1 ? 'unread message' : 'unread messages' }
          </p>

          <a className="btn btn-danger" onClick={ this.onNewMessage }>
            <i className="fa fa-plus"></i>
          </a>

          <button className="btn btn-default" onClick={ this.onMessageSelected } disabled={ disabledAttribute }>
            { this.getSelectImage() }
          </button>
          <button className="btn btn-default" onClick={ this.onMarkMessageAsRead } disabled={ disabledAttribute }>
            Mark as Read
          </button>
          <button className="btn btn-default" onClick={ this.onMarkMessageAsUnread } disabled={ disabledAttribute }>
            Mark as Unread
          </button>

          <select className="form-control label-select"
            onChange={ this.onApplyLabel } value={ this.state.apply } disabled={ disabledAttribute }>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select"
            onChange={ this.onRemoveLabel } value={ this.state.remove } disabled={ disabledAttribute }>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={ this.onMessageDelete } disabled={ disabledAttribute }>
            <i className="fa fa-trash-o"></i>
          </button>

        </div>
      </div>
    )
  }
}

export default Toolbar
