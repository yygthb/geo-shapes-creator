import { ADD_NEW_FIGURE, INC_MAX_ID, SET_DEFAULT_FILL_COLOR, SET_FILL_COLOR } from "./actionTypes";

// figuresReducer
export function addNewFigure(name) {
  return {
    type: ADD_NEW_FIGURE,
    value: name
  }
}

export function incMaxId() {
  return {
    type: INC_MAX_ID
  }
}

// fillColorReducer
export function setDefaultFillColor() {
  return {
    type: SET_DEFAULT_FILL_COLOR
  }
}

export function setFillColor(color) {
  return {
    type: SET_FILL_COLOR,
    value: color
  }
}