import config from '../../config/config'
import { ADD_NEW_FIGURE, GET_ACTIVE_FIGURE, INC_MAX_ID, RESET_ACTIVE_FIGURE, SAVE_POSITION, GET_NEW_COLOR_TO_ACTIVE_FIGURE, KEY_LISTENER_DELETE } from "../actions/actionTypes"

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
  maxId: 2,
  activeFigure: null
}

export default function figuresReducer (state = initialState, action) {

  switch(action.type) {
    case ADD_NEW_FIGURE:
      const figures = state.figures
      const maxId = state.maxId + 1
      figures.push({
        id: maxId,
        type: action.name,
        color: config.DEFAULT_FIGURE_COLOR,
        position: {
          top: 'calc(50% - 50px)',
          left: 'calc(50% - 100px)'
        }    
      })
      return {
        ...state,
        figures: figures,
        maxId: maxId,
        activeFigure: null,
      }
    case INC_MAX_ID:
      return {
        ...state,
        maxId: state.maxId + 1
      }
    case GET_ACTIVE_FIGURE:
      if (action.value.figure.id < state.maxId) {
        const figures = state.figures
        figures[action.value.index].id = state.maxId + 1
        return {
          ...state,
          figures: figures,
          maxId: state.maxId + 1,
          activeFigure: action.value.figure
        }
      }
      return {
        ...state,
        activeFigure: action.value.figure
      }
    case RESET_ACTIVE_FIGURE:
      return {
        ...state,
        activeFigure: null
      }
    case SAVE_POSITION:
      const prevFigures = state.figures
      prevFigures[action.index].position.top = action.top
      prevFigures[action.index].position.left = action.left
      return {
        ...state,
        figures: prevFigures
      }
    case GET_NEW_COLOR_TO_ACTIVE_FIGURE:
      const activeFigureId = state.activeFigure.id
      const prevFigures2 = state.figures
      const index = prevFigures2.findIndex(figure => figure.id === activeFigureId)
      prevFigures2[index].color = action.color
      return {
        ...state,
        figures: prevFigures2
      }
    case KEY_LISTENER_DELETE:
      if (action.eCode === config.DELETE_KEY_DOWN) {
        const prevFigures3 = state.figures
        prevFigures3.splice(action.index, 1)
        return {
          ...state,
          figures: prevFigures3,
          activeFigure: null,
        }
      }
      return state
    default:
      return state
  }
}