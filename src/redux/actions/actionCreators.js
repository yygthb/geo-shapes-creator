import { ADD_NEW_FIGURE, GET_ACTIVE_FIGURE, RESET_ACTIVE_FIGURE, SAVE_POSITION, GET_NEW_COLOR_TO_ACTIVE_FIGURE, KEY_LISTENER_DELETE } from "./actionTypes";

export function addNewFigure(name) {
  return {
    type: ADD_NEW_FIGURE,
    name
  }
}

export function getactiveFigure(value) {
  return {
    type: GET_ACTIVE_FIGURE,
    value
  }
}

export function resetActiveFigure() {
  return {
    type: RESET_ACTIVE_FIGURE
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

export function onDeleteKeyDownListener(eCode, index) {
  return {
    type: KEY_LISTENER_DELETE,
    eCode, index
  }
}