import React from 'react'
import ReactDOM from 'react-dom'
import './normalize.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import mainReducer from './redux/mainReducer'

function logger(store) {
  return next => action => {
    console.log('will dispatch', action)
    const returnValue = next(action)
    return returnValue
  }
}

// const store = createStore(mainReducer, applyMiddleware(logger))
const store = createStore(mainReducer, applyMiddleware())

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

reportWebVitals()
