import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom'
import ReduxPromise from 'redux-promise'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
import 'font-awesome/css/font-awesome.css'
import './index.css'

import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  (
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <Route exact={ true } path="/"
            render={ ({ history }) => {
              return (
                <App toggle={ true } messageSelected={ false } history={ history }/>
              )
            }}/>
          <Route exact={ true } path="/compose"
              render={ ({ history }) => {
                return (
                  <App toggle={ false } messageSelected={ false } history={ history }/>
                )
              }}/>
          <Route exact={ true } path="/messages/:id"
              render={ ({ history }) => {
                return (
                  <App toggle={ true } messageSelected={ true } history={ history }/>
                )
              }}/>
        </div>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'))

registerServiceWorker()
