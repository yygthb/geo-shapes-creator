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
      id: 3,
      type: 'triangle',
      color: 'red',
    },
  ])

  // max created id
  const [maxId, setMaxId] = useState(3)

  // color fill background in sidebar
  const defaultFigure = { id: 0, type: '', color: 'darkorange' }
  const [activeFigure, setActiveFigure] = useState(defaultFigure)

  // create Figure (triangle or rectangle)
  const createFigureHandler = name => {
    console.log('create: ', name)
    setMaxId(maxId + 1)
  }

  // choose Figure in Content area onClick
  const onFigureClickHandler = (e, figure, index) => {
    e.stopPropagation()
    setActiveFigure(figure)

    console.log('click on id: ', figure.id, ' (index: ', index, ')');
    if (figure.id < maxId) {
      const f = [...figures]
      f[index].id = maxId + 1
      setFigures(f)
      setMaxId(maxId + 1)
    }
  }

  // click out of Figure's areas
  const resetActiveFigure = (e) => {
    setActiveFigure(defaultFigure)
  }

  // open color picker on button click
  const colorPickerOpen = () => {
    console.log('open color picker');
  }

  return (
    <main className={style.main}>
      <Sidebar
        createFigureHandler={createFigureHandler}
        activeFigure={activeFigure}
        colorPickerOpen={colorPickerOpen}
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