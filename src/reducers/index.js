import { combineReducers } from 'redux'
import getMessagesReducer from './reducerGet'
import addMessageReducer from './reducerPost'
import selectMessage from './reducerToolbar'

const rootReducer = combineReducers({
  messages: getMessagesReducer,
  toggleForm: addMessageReducer,
  selectedList: selectMessage
})

export default rootReducer;
