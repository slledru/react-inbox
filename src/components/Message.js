import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { starMessage, selectMessage } from '../actions/actionPatch'

class Message extends Component {
  onSelectedChanged = (id) => (event) => {
    event.preventDefault()
    console.log('onSelectedChanged', id)
    this.props.selectMessage(id)
  }

  onStarClicked = (message) => (event) => {
    event.preventDefault()
    this.props.starMessage(message)
  }

  renderLabel = (message) => {
    return message.labels.map((label) => {
      return <span key={ label } className="label label-warning">{ label }</span>
    })
  }

  render() {
    const message = this.props.message
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
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of Message
  console.log('Message:mapStateToProps - state: ', state)
  return {
    selectedList: state.selectedList
  }
}

// Anything returned from this function will end up as props
// on the MessageList container
function mapDispatchToProps(dispatch) {
  // Whenever getMessages is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ starMessage, selectMessage }, dispatch)
}

// Promote MessageList from component to container - it needs to know
// about this new dispatch method, selectBook.  Make it available
// as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(Message)
