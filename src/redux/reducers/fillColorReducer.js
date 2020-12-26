const defaultFillColor = '#FFFFFF'

const initialState = {
  fillColor: defaultFillColor,
}

export default function fillColorReducer (state = initialState, action) {

  switch(action.type) {
    case 'SET_DEFAULT_FILL_COLOR':
      return {
        fillColor: defaultFillColor
      }
    case 'SET_FILL_COLOR':
      return {
        fillColor: action.value
      }
    default:
      return state
  }
}