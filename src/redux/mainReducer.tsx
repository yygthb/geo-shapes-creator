import {combineReducers} from 'redux'

import figuresState from './reducers/figuresReducer'
import fillColorState from './reducers/fillColorReducer'

export default combineReducers({
  figuresState,
  fillColorState
})