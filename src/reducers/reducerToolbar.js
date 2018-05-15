import { APPLY_LABEL, REMOVE_LABEL,
  STAR_MESSAGE, SELECT_MESSAGE
} from '../constants'

function updateLabels(state = null, action) {
  console.log('reducer:updateLabels')
  /* eslint-disable */
  switch (action.type) {
    case APPLY_LABEL:
      console.log('apply', action)
      return [ ...action.payload.data._embedded.messages ]
    case REMOVE_LABEL:
      console.log('remove', action)
      return [ ...action.payload.data._embedded.messages ]
    default:
  }
  /* eslint-enable */
  return state
}

function selectMessage(state = [], action) {
  console.log('reducer:selectMessage', action)
  /* eslint-disable */
  switch (action.type) {
    case SELECT_MESSAGE:
      console.log('select:action', action)
      console.log('select:state', state)
      return [ ...state, action.payload ]
    default:
  }
  /* eslint-enable */
  return state
}

function starMessage(state = [], action) {
  console.log('reducer:starMessage', action)
  /* eslint-disable */
  switch (action.type) {
    case STAR_MESSAGE:
      console.log('star', [ ...state, action.payload ])
      if (action.payload.status === 200) {
        
      }
      return [ ...action.payload.data._embedded.messages ]
    default:
  }
  /* eslint-enable */
  return state
}

export { updateLabels, selectMessage, starMessage }
