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
    this.state = { apply: '', remove: '' }
  }

  onApplyLabel = (event) => {
    event.preventDefault()
    this.props.applyLabel(event.target.value)
    this.setState({ ...this.state, apply: ''})
  }

  onRemoveLabel = (event) => {
    event.preventDefault()
    this.props.removeLabel(event.target.value)
    this.setState({ ...this.state, remove: ''})
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <button className="btn btn-default">
            <i className="fa fa-check-square-o"></i>
          </button>
          <button className="btn btn-default">
            Mark as Read
          </button>
          <button className="btn btn-default">
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

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>

        </div>
      </div>
    )
  }
}

export default Toolbar
