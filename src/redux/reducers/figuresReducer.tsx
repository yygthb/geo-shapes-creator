import config from '../../config/config'
import { ADD_NEW_FIGURE, GET_ACTIVE_FIGURE, RESET_ACTIVE_FIGURE, SAVE_POSITION, GET_NEW_COLOR_TO_ACTIVE_FIGURE, KEY_LISTENER_DELETE } from "../actions/actionTypes"
import { FigureType } from '../../types'

type StateType = {
  figures: Array<FigureType>
  maxId: number
  activeFigure: null | FigureType
}

type ActionType = {
  type: string
  name: 'triangle' | 'rectangle'
  value: {
    figure: FigureType
    index: number
  }
  index: number
  top: string
  left: string
  color: string
  eCode: string
}

const initialState: StateType = localStorage.getItem(config.LOCAL_STORAGE_FIGURE)
  ? {
    figures: JSON.parse(localStorage.getItem(config.LOCAL_STORAGE_FIGURE) || '{}').figures,
    maxId: JSON.parse(localStorage.getItem(config.LOCAL_STORAGE_FIGURE) || '{}').maxId,
    activeFigure: null,
  }
  : {
    figures: [],
    maxId: 0,
    activeFigure: null,
  }

export default function figuresReducer(state = initialState, action: ActionType) {

  switch (action.type) {
    case ADD_NEW_FIGURE:
      const newFigure = {
        id: state.maxId + 1,
        type: action.name,
        color: config.DEFAULT_FIGURE_COLOR,
        position: {
          top: 'calc(50% - 50px)',
          left: 'calc(50% - 100px)'
        }
      }
      return {
        ...state,
        maxId: state.maxId + 1,
        figures: [...state.figures, newFigure],
      }

    case GET_ACTIVE_FIGURE:
      if (action.value.figure.id < state.maxId) {
        const figures = state.figures
        figures[action.value.index].id = state.maxId + 1
        return {
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
      const figures = state.figures
      figures[action.index].position.top = action.top
      figures[action.index].position.left = action.left
      return {
        ...state,
        figures: figures
      }

    case GET_NEW_COLOR_TO_ACTIVE_FIGURE:
      const activeFigureId = state.activeFigure!.id
      return {
        ...state,
        figures: [...state.figures.map(f => {
          if (f.id === activeFigureId) {
            return { ...f, color: action.color }
          }
          return f
        })]
      }

    case KEY_LISTENER_DELETE:
      if (action.eCode === config.DELETE_KEY_DOWN) {
        const figures = state.figures
        figures.splice(action.index, 1)
        if (figures.length === 0) {
          return {
            figures: [],
            maxId: 0,
            activeFigure: null,
          }
        }
        return {
          ...state,
          figures: figures,
          activeFigure: null,
        }
      }
      return state

    default:
      return state
  }
}