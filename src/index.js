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
            render={ () => {
              return (
                <App toggle={ true } />
              )
            }}/>
          <Route exact={ true } path="/compose"
              render={ () => {
                return (
                  <App toggle={ false } />
                )
              }}/>
          <Route exact={ true } path="/messages/:id"
              render={ ( { history, match } ) => {
                return (
                  <App toggle={ true } selectedId={ match.params.id } />
                )
              }}/>
        </div>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'))

registerServiceWorker()
