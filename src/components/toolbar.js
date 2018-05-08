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
  }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p class="pull-right">
            <span class="badge badge">2</span>
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

          <select class="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select class="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button class="btn btn-default">
            <i class="fa fa-trash-o"></i>
          </button>

        </div>
      </div>
    )
  }
}

export default Toolbar
