const defaultFillColor = '#FFFFFF'
const defaultFigureColor = '#FF8C00'

const initialState = {
  fillColor: defaultFillColor,
  figures: [
    {
      id: 1,
      type: 'rectangle',
      color: '#008000',
      position: {
        top: 'calc(50% - 50px)',
        left: 'calc(50% - 100px)'
      }
    },
    {
      id: 2,
      type: 'triangle',
      color: '#ff0000',
      position: {
        top: 'calc(50% + 100px)',
        left: 'calc(50% + 50px)'
      }
    },
  ],
  maxId: 2
}

export default function mainReducer (state = initialState, action) {

  switch(action.type) {
    case 'ADD_NEW_FIGURE':
      const figures = state.figures
      let maxId = state.maxId
      maxId = maxId + 1
      figures.push({
        id: maxId,
        type: action.value,
        color: defaultFigureColor,
        position: {
          top: 'calc(50% - 50px)',
          left: 'calc(50% - 100px)'
        }    
      })
      return {
        ...state,
        figures: figures,
        maxId: maxId
      }
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