const defaultFillColor = '#FFFFFF'

const initialState = {
  fillColor: defaultFillColor
}

export default function mainReducer (state = initialState, action) {

  switch(action.type) {
    case 'SET_DEFAULT_FILL_COLOR':
      return {
        ...state,
        fillColor: defaultFillColor
      }
    case 'SET_FILL_COLOR':
      return {
        ...state,
        fillColor: action.value
      }
    default:
      return state
  }
}