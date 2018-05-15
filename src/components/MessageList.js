import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ComposeForm from './ComposeForm'
import getMessages from '../actions/actionGet'
import { starMessage, selectMessage } from '../actions/actionPatch'

class MessageList extends Component {
  componentDidMount() {
    this.props.getMessages()
  }

  onSelectedChanged = (id) => (event) => {
    event.preventDefault()
    console.log('onSelectedChanged', id)
    this.props.selectMessage(id)
    //this.props.selectMessage(this.props.message)
    // const newState = { ...this.state, selected: !this.state.selected }
    // this.setState(newState)
    // this.props.select(this.convertStateToMessage(newState))
  }

  onStarClicked = (message) => (event) => {
    event.preventDefault()
    this.props.starMessage(message)
    // const newState = { ...this.state, starred: !this.state.starred }
    // this.setState(newState)
    // this.props.star(this.convertStateToMessage(newState))
  }

  renderLabel = (message) => {
    return message.labels.map((label) => {
      return <span key={ label } className="label label-warning">{ label }</span>
    })
  }

  renderMessage = (message) => {
    if (!message) {
      return <div>Loading...</div>
    }
    let rowStyle = "row message"
    if (this.props.selectedList.includes(message.id)) {
      rowStyle += " selected"
    }
    if (message.read) {
      rowStyle += " read"
    }
    else {
      rowStyle += " unread"
    }
    return (
      <div className={ rowStyle } key={ message.id }>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2" onClick={ this.onSelectedChanged(message.id) }>
              { this.props.selectedList.includes(message.id) ?
                  <i className="fa fa-check-square-o"></i> :
                  <i className="far fa-square"></i> }
            </div>
            <div className="col-xs-2" onClick={ this.onStarClicked(message) }>
              { message.starred ? <i className="fa fa-star"></i> : <i className="fa fa-star-o"></i>}
            </div>
          </div>
        </div>
        <div className="col-xs-11 text-left">
          { this.renderLabel(message) }
          <a >
            {message.subject}
          </a>
        </div>
      </div>
    )
  }

  render = () => {
    console.log('MessageList:render', this.props.messages)
    if (!this.props.messages) {
      return <div>Loading...</div>
    }
    const newMessageForm = `col-md-10 ${this.props.toggleForm ? 'show' : 'hide' }`
    return (
      <div className="row">
        <div className={ newMessageForm }>
          <ComposeForm addMessage = { this.props.addMessage } />
        </div>
        <div className="col-md-10">
          { this.props.messages.map(this.renderMessage) }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of MessageList
  console.log('MessageList:mapStateToProps - state: ', state)
  return {
    messages: state.messages,
    selectedList: state.selectedList
  }
}

// Anything returned from this function will end up as props
// on the MessageList container
function mapDispatchToProps(dispatch) {
  // Whenever getMessages is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ getMessages, starMessage, selectMessage }, dispatch)
}

// Promote MessageList from component to container - it needs to know
// about this new dispatch method, selectBook.  Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
