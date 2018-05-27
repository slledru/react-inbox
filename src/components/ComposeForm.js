import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../actions/actionPost'
import { bindActionCreators } from 'redux'
import { Route } from 'react-router-dom'

class ComposeForm extends Component {
  onSubmit = (history) => (event) => {
    event.preventDefault()
    const subject = document.querySelector('#subject').value || ''
    const body = document.querySelector('#body').value || ''
    if (subject && body) {
      this.props.addMessage(subject, body)
      event.target.reset()
    }
    history.push('/')
  }

/*
<button
type='button'
onClick={() => { history.push('/new-location') }}
>
Click Me!
</button>
*/
  render() {
    return (
      <Route render={({ history }) => (
        <form className="form-horizontal well" onSubmit={ this.onSubmit(history) }>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <h4>Compose Message</h4>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject"/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">Body</label>
            <div className="col-sm-8">
              <textarea name="body" id="body" className="form-control"></textarea>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
              <input type="submit" value="Send" className="btn btn-primary"/>
            </div>
          </div>
        </form>
        )}>
      </Route>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addMessage }, dispatch)
}

export default connect(null, mapDispatchToProps)(ComposeForm)
