import { combineReducers } from 'redux'
import getMessagesReducer from './reducerGet'
import selectMessage from './reducerToolbar'

const rootReducer = combineReducers({
  messages: getMessagesReducer,
  selectedList: selectMessage
})

export default rootReducer;
