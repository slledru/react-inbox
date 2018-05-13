import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'font-awesome/css/font-awesome.css'
import '../index.css'
import '../App.css'
import '../inbox.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Message from './Message'
import ComposeForm from './ComposeForm'
import getMessages from '../actions/actionGet'

class MessageList extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   messages: props.messages,
    //   formToggle: props.formToggle
    // }
  }

  // this is called when property changes
  componentWillReceiveProps = (newProps) => {
    // this.setState({
    //   messages: newProps.messages,
    //   formToggle: newProps.formToggle
    // })
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
    const newMessageForm = `col-md-10 ${this.props.toggleForm ? 'show' : 'hide' }`
    return (
      <div className="row">
        <div className={ newMessageForm }>
          <ComposeForm addMessage = { this.props.addMessage } />
        </div>
        <div className="col-md-10">Here??
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    messages: state.messages,
    toggleForm: state.toggleForm
  }
}

// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ getMessages }, dispatch)
}

// Promote BookList from component to container - it needs to know
// about this new dispatch method, selectBook.  Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
