import React from 'react'
import ReactDOM from 'react-dom'
import './normalize.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import mainReducer from './redux/mainReducer'
import config from './config/config'

// function logger(store) {
//   return next => action => {
//     console.log('will dispatch', action)
//     const returnValue = next(action)
//     return returnValue
//   }
// }

function saveToLocalStorage(store) {
  return next => action => {
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
