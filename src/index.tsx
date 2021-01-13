import React from 'react'
import ReactDOM from 'react-dom'
import './normalize.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import mainReducer from './redux/mainReducer'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { FigureType } from './types'
import config from './config/config'

// function logger(store) {
//   return next => action => {
//     console.log('will dispatch', action)
//     const returnValue = next(action)
//     return returnValue
//   }
// }

export type GetStateType = {
  figuresState: {
    activeFigure: null | FigureType
    figures: Array<FigureType>
    maxZIndexCSS: number
  }
  fillColorState: {
    fillColor: string
  }
}

type StoreType = {
  dispatch: () => void
  getState: () => GetStateType
}

// function saveToLocalStorage(store: any) {
function saveToLocalStorage(store: StoreType) {
  return (next: any) => (action: any) => {
    const returnValue = next(action)

    // сохранение части store в localStorage
    const figuresState = store.getState().figuresState

    localStorage.setItem(config.LOCAL_STORAGE_FIGURE, JSON.stringify(figuresState))

    return returnValue
  }
}

// const store = createStore(mainReducer, applyMiddleware(logger))
const store = createStore(mainReducer, applyMiddleware(saveToLocalStorage))

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

reportWebVitals()
