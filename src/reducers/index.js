import { combineReducers } from 'redux'
import getMessages from './reducerGet'
import addMessage from './reducerPost'

const rootReducer = combineReducers({
  getMessages,
  addMessage
})

export default rootReducer;
