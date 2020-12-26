import { DELETE_KEY_LISTENER, SET_DEFAULT_FILL_COLOR, SET_FILL_COLOR } from "../actions/actionTypes"

const defaultFillColor = '#FFFFFF'
const eCodeDelete = 'Delete'

const initialState = {
  fillColor: defaultFillColor,
}

export default function fillColorReducer (state = initialState, action) {

  switch(action.type) {
    case SET_DEFAULT_FILL_COLOR:
      return {
        fillColor: defaultFillColor
      }
    case SET_FILL_COLOR:
      return {
        fillColor: action.value
      }
    case DELETE_KEY_LISTENER:
      if (action.eCode === eCodeDelete) {
        return {
          fillColor: defaultFillColor
        }
      }
      return state
    default:
      return state
  }
}