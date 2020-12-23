import React, { useState } from 'react'
import style from './App.module.css'
import Content from './components/Content/Content'
import Sidebar from './components/Sidebar/Sidebar'

function App() {

  // figures in Content area
  const [figures, setFigures] = useState([
    {
      id: 1,
      type: 'rectangle',
      color: 'green',
    },
    {
      id: 2,
      type: 'triangle',
      color: 'red',
    },
  ])

  // color fill background in sidebar
  const defaultFigure = { id: 0, type: '', color: 'darkorange' }
  const [activeFigure, setActiveFigure] = useState(defaultFigure)

  // create Figure (triangle or rectangle)
  const createFigureHandler = name => {
    console.log('create: ', name)
  }

  // choose Figure in Content area onClick
  const onFigureClickHandler = (e, figure) => {
    e.stopPropagation()
    setActiveFigure(figure)
  }

  // click out of Figure's areas
  const resetActiveFigure = (e) => {
    setActiveFigure(defaultFigure)
  }

  return (
    <main className={style.main}>
      <Sidebar
        createFigureHandler={createFigureHandler}
        activeFigure={activeFigure}
      />
      <Content
        figures={figures}
        activeFigure={activeFigure}
        onFigureClickHandler={onFigureClickHandler}
        resetActiveFigure={resetActiveFigure}
      />
    </main>
  );
}

export default App