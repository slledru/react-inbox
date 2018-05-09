import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'font-awesome/css/font-awesome.css'
import '../index.css'
import '../App.css'
import '../inbox.css'

import React, { Component } from 'react'

/*
subject: "connecting the system won't do anything, we need to input the mobile AI panel!",
read: false,
starred: false,
selected: true,

*/
class Message extends Component {
  constructor(props) {
    super(props)
    // this.state is set only once when Message is instantiated
    this.state = { ...props.message }
  }

  // this is called when property changes
  componentWillReceiveProps(newProps){
    this.setState({ ...newProps.message })
  }

  convertStateToMessage = (state) => {
    const { id, subject, read, starred, selected } = state
    return { id, subject, read, starred, selected }
  }

  onSelectedChanged = (event) => {
    event.preventDefault()
    const newState = { ...this.state, selected: !this.state.selected }
    this.setState(newState)
    this.props.select(this.convertStateToMessage(newState))
  }

  onStarClicked = (event) => {
    event.preventDefault()
    const newState = { ...this.state, starred: !this.state.starred }
    this.setState(newState)
    this.props.star(this.convertStateToMessage(newState))
  }

  existLabel = (label) => {
    return this.state.labels.includes(label)
  }

  getDevLabel = () => {
    if (this.existLabel('dev')) {
      return <span className="label label-warning">dev</span>
    }
    return ''
  }

  getPersonalLabel = () => {
    if (this.existLabel('personal')) {
      return <span className="label label-warning">personal</span>
    }
    return ''
  }

  getGSchoolLabel = () => {
    if (this.existLabel('gschool')) {
      return <span className="label label-warning">gschool</span>
    }
    return ''
  }

  render() {
    let rowStyle = "row message"
    if (this.state.selected) {
      rowStyle += " selected"
    }
    if (this.state.read) {
      rowStyle += " read"
    }
    else {
      rowStyle += " unread"
    }
    return (
      <div className={ rowStyle }>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2" onClick={ this.onSelectedChanged }>
              { this.state.selected ? <i className="fa fa-check-square-o"></i> : <i className="far fa-square"></i> }
            </div>
            <div className="col-xs-2" onClick={ this.onStarClicked }>
              { this.state.starred ? <i className="fa fa-star"></i> : <i className="fa fa-star-o"></i>}
            </div>
          </div>
        </div>
        <div className="col-xs-11 text-left">
          { this.getDevLabel() }
          { this.getPersonalLabel() }
          { this.getGSchoolLabel() }
          <a >
            {this.state.subject}
          </a>
        </div>
      </div>
    )
  }
}

export default Message
