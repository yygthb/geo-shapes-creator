import config from "../../config/config"
import { KEY_LISTENER_DELETE, GET_ACTIVE_FIGURE, GET_NEW_COLOR_TO_ACTIVE_FIGURE, RESET_ACTIVE_FIGURE } from "../actions/actionTypes"

const initialState = {
  fillColor: config.DEFAULT_FILL_COLOR
}

export default function fillColorReducer (state = initialState, action) {

  switch(action.type) {
    case RESET_ACTIVE_FIGURE:
      return {
        fillColor: config.DEFAULT_FILL_COLOR
      }
    case GET_ACTIVE_FIGURE:
      return {
        fillColor: action.value.figure.color
      }
    case GET_NEW_COLOR_TO_ACTIVE_FIGURE:
      return {
        fillColor: action.color
      }
    case KEY_LISTENER_DELETE:
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