import { combineReducers } from 'redux'
import getMessagesReducer from './reducerGet'
import addMessageReducer from './reducerPost'

const rootReducer = combineReducers({
  messages: getMessagesReducer,
  addMessageReducer
})

export default rootReducer;
