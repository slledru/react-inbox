import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './inbox.css'
import Message from './Message'
import ComposeForm from './ComposeForm'
import getMessages from '../actions/actionGet'
import { starMessage, selectMessage } from '../actions/actionPatch'

class MessageList extends Component {
  componentDidMount() {
    this.props.getMessages()
  }

  renderMessage = (message) => <Message key={ message.id } message={ message } />

  renderComposeForm() {
    if (!this.props.toggle) {
      return (
        <div className="col-md-10">
          <ComposeForm />
        </div>
      )
    }
    return null
  }

  render = () => {
    if (!this.props.messages) {
      return <div>Loading...</div>
    }
    // console.log('MessageList:render', Object.values(this.props.messages))
    return (
      <div className="row">
        { this.renderComposeForm() }
        <div className="col-md-10">
          { Object.values(this.props.messages).map(this.renderMessage) }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of MessageList
  // console.log('MessageList:mapStateToProps - state: ', state)
  return {
    messages: state.messages
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
