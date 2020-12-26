import React from 'react'
import ReactDOM from 'react-dom'
import './normalize.css'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import mainReducer from './redux/mainReducer'

const store = createStore(mainReducer)

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'))

reportWebVitals()
