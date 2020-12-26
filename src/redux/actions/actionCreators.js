import { ADD_NEW_FIGURE, GET_ACTIVE_FIGURE, INC_MAX_ID, Z_INDEX_UPDATE, RESET_ACTIVE_FIGURE, SET_DEFAULT_FILL_COLOR, SET_FILL_COLOR, SAVE_POSITION, GET_NEW_COLOR_TO_ACTIVE_FIGURE, DELETE_KEY_LISTENER } from "./actionTypes";

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

export function getactiveFigure(activeFigure) {
  return {
    type: GET_ACTIVE_FIGURE,
    value: activeFigure
  }
}

export function resetActiveFigure() {
  return {
    type: RESET_ACTIVE_FIGURE
  }
}

export function zIndexUpdateHandler(id, index) {
  return {
    type: Z_INDEX_UPDATE,
    id,
    index
  }
}

export function onSavePosition(index, top, left) {
  return {
    type: SAVE_POSITION,
    index, top, left,
  }
}

export function getNewColorToFigure(color) {
  return {
    type: GET_NEW_COLOR_TO_ACTIVE_FIGURE,
    color
  }
}

export function onKeyDownListener(eCode, index) {
  return {
    type: DELETE_KEY_LISTENER,
    eCode, index
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