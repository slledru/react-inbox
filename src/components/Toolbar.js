import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import {
  applyLabel,
  removeLabel,
  selectAllMessages,
  markAsRead,
  markAsUnread,
  deleteMessages,
  clearSelection
} from '../actions/actionPatch'
import { toggleMessageForm } from '../actions/actionPost'

const labelList = [ 'dev', 'personal', 'gschool']

class Toolbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false
    }
  }
  onApplyLabel = (event) => {
    event.preventDefault()
    this.props.applyLabel(event.target.value, this.props.selectedList)
  }

  onRemoveLabel = (event) => {
    event.preventDefault()
    this.props.removeLabel(event.target.value, this.props.selectedList)
  }

  onMessageSelected = (event) => {
    event.preventDefault()
    this.props.selectAllMessages(this.props.messages, this.props.selectedList)
  }

  onMessageDelete = (event) => {
    event.preventDefault()
    this.props.deleteMessages(this.props.selectedList)
    this.props.clearSelection()
  }

  onMarkMessageAsRead = (event) => {
    event.preventDefault()
    this.props.markAsRead(this.props.selectedList)
  }

  onMarkMessageAsUnread = (event) => {
    event.preventDefault()
    this.props.markAsUnread(this.props.selectedList)
  }

  getMessageCount = () => {
    return this.props.messages ? Object.keys(this.props.messages).length : 0
  }

  getUnreadMessageCount = () => {
    if (this.props.messages) {
      const values = Object.values(this.props.messages)
      return values.filter((value) => !value.read).length
    }
    return 0
  }

  getSelectedMessageCount = () => {
    return this.props.selectedList.length
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

  renderLabelList() {
    return (
      labelList.map((label, index) => <option key={ index + 1 } value={ label }>{ label }</option>)
    )
  }

  renderLink() {
    if (this.props.toggle) {
      return (
        <Link className="btn btn-danger" to="/compose" >
          <i className="fa fa-plus"></i>
        </Link>
      )
    }
    return (
      <Link className="btn btn-danger" to="/" >
        <i className="fa fa-plus"></i>
      </Link>
    )
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

          { this.renderLink() }

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
            onChange={ this.onApplyLabel } disabled={ disabledAttribute }>
            <option default>Apply label</option>
            { this.renderLabelList() }
          </select>

          <select className="form-control label-select"
            onChange={ this.onRemoveLabel } disabled={ disabledAttribute }>
            <option>Remove label</option>
              { this.renderLabelList() }
          </select>

          <button className="btn btn-default" onClick={ this.onMessageDelete } disabled={ disabledAttribute }>
            <i className="fa fa-trash-o"></i>
          </button>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages,
    selectedList: state.selectedList,
    toggleForm: state.toggleForm
  }
}

// Anything returned from this function will end up as props
// on the MessageList container
function mapDispatchToProps(dispatch) {
  // Whenever getMessages is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({
    toggleMessageForm,
    applyLabel,
    removeLabel,
    selectAllMessages,
    markAsRead,
    markAsUnread,
    deleteMessages,
    clearSelection
  }, dispatch)
}

/*
<Link className="btn btn-danger" to="/" >
  <i className="fa fa-plus"></i>
</Link>
*/

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
