const defaultFigureColor = '#FF8C00'

const initialState = {
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

export default function figuresReducer (state = initialState, action) {

  switch(action.type) {
    case 'ADD_NEW_FIGURE':
      const figures = state.figures
      const maxId = state.maxId + 1
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
    case 'INC_MAX_ID':
      return {
        ...state,
        maxId: state.maxId + 1
      }
    default:
      return state
  }
}