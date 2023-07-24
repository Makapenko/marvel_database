import { combineReducers } from 'redux'
import comicsReducer from './reducers/comicsReducer.js'
import userReducer from './reducers/userReducer.js'

const rootReducer = combineReducers({
  comicsReducer,
  userReducer,
})
export default rootReducer
