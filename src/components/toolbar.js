import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { applyLabel, removeLabel } from '../actions/actionPatch'

const labelList = [ 'dev', 'personal', 'gschool']

class Toolbar extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     apply: '',
  //     remove: '',
  //     formToggle: props.formToggle,
  //     messages: props.messages,
  //     messageSelected: props.messages.filter((message) => message.selected).length > 0
  //   }
  // }

  onApplyLabel = (event) => {
    event.preventDefault()
    this.props.applyLabel(event.target.value)
  }

  onRemoveLabel = (event) => {
    event.preventDefault()
    this.props.removeLabel(event.target.value)
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
    this.props.toggleComposeForm(!this.props.toggleForm)
  }

  getMessageCount = () => {
    return this.props.messages ? this.props.messages.length : 0
  }

  getUnreadMessageCount = () => {
    return this.props.messages ?
      this.props.messages.filter((message) => !message.read).length : 0
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
            onChange={ this.onApplyLabel } value={ this.props.apply } disabled={ disabledAttribute }>
            <option>Apply label</option>
            { this.renderLabelList() }
          </select>

          <select className="form-control label-select"
            onChange={ this.onRemoveLabel } value={ this.props.remove } disabled={ disabledAttribute }>
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
    toggleForm: state.toggleForm,
    apply: state.apply,
    remove: state.remove
  }
}

// Anything returned from this function will end up as props
// on the MessageList container
function mapDispatchToProps(dispatch) {
  // Whenever getMessages is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ applyLabel, removeLabel }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
