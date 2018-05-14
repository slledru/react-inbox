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
    this.state = {
      selected: props.message.selected,
      starred: props.message.starred
    }
  }

  // this is called when property changes
  componentWillReceiveProps(newProps){
    this.setState({
      selected: newProps.message.selected,
      starred: newProps.message.starred
    })
  }

  convertStateToMessage = (state) => {
    const { starred, selected } = state
    const { id, subject, read } = this.props.message
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
    return this.props.message.labels.includes(label)
  }

  getLabel = (label) => {
    if (this.existLabel(label)) {
      return <span key={ label } className="label label-warning">{ label }</span>
    }
    return ''
  }

  renderLabel = () => {
    return this.props.message.labels.map(this.getLabel)
  }

  render() {
    let rowStyle = "row message"
    if (this.state.selected) {
      rowStyle += " selected"
    }
    if (this.props.message.read) {
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
          { this.renderLabel() }
          <a >
            {this.props.message.subject}
          </a>
        </div>
      </div>
    )
  }
}

export default Message
