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
import NewMessage from './components/AppWithNewMessage'
import registerServiceWorker from './registerServiceWorker'

import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  (
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <Route exact={ true } path="/" component={ App }/>
          <Route path="/compose" component={ NewMessage }/>
        </div>
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'))

registerServiceWorker()
