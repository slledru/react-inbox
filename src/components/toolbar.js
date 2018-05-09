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
    console.log(props)
    this.state = {
      apply: '',
      remove: '',
      messageSelected: props.messageSelected,
      unreadMessage: props.unreadMessage
    }
  }

  // this is called when property changes
  componentWillReceiveProps(newProps){
    this.setState({
      ...this.state,
      messageSelected: newProps.messageSelected,
      unreadMessage: newProps.unreadMessage })
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

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-11">
          <p className="pull-right">
            <span className="badge badge">{ this.state.unreadMessage }</span>
            { this.state.unreadMessage < 1 ? 'unread message' : 'unread messages' }
          </p>

          <button className="btn btn-default" onClick={ this.onMessageSelected }>
            { this.state.messageSelected ? <i className="fa fa-check-square-o"></i> : <i className="far fa-square"></i> }
          </button>
          <button className="btn btn-default" onClick={ this.onMarkMessageAsRead }>
            Mark as Read
          </button>
          <button className="btn btn-default" onClick={ this.onMarkMessageAsUnread }>
            Mark as Unread
          </button>

          <select className="form-control label-select"
            onChange={ this.onApplyLabel } value={ this.state.apply }>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select"
            onChange={ this.onRemoveLabel } value={ this.state.remove }>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={ this.onMessageDelete }>
            <i className="fa fa-trash-o"></i>
          </button>

        </div>
      </div>
    )
  }
}

export default Toolbar
