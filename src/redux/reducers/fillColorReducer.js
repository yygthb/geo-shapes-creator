import config from "../../config/config"
import { DELETE_KEY_LISTENER, SET_DEFAULT_FILL_COLOR, SET_FILL_COLOR } from "../actions/actionTypes"

const initialState = {
  fillColor: config.DEFAULT_FILL_COLOR,
}

export default function fillColorReducer (state = initialState, action) {

  switch(action.type) {
    case SET_DEFAULT_FILL_COLOR:
      return {
        fillColor: config.DEFAULT_FILL_COLOR
      }
    case SET_FILL_COLOR:
      return {
        fillColor: action.value
      }
    case DELETE_KEY_LISTENER:
      if (action.eCode === config.DELETE_KEY_DOWN) {
        return {
          fillColor: config.DEFAULT_FILL_COLOR
        }
      }
      return state
    default:
      return state
  }
}