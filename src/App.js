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

  // регистрация максимального id для задания z-index в стилях (последняя выбранная фигура будет поверх остальных)
  const [maxId, setMaxId] = useState(3)

  // darkorange - цвет по умолчанию для кнопки Fill в сайдбаре
  const defaultFigure = { id: 0, type: '', color: 'darkorange' }
  const [activeFigure, setActiveFigure] = useState(defaultFigure)

  // добавление фигуры в массив figures - отображение в рабочей области программы
  const createFigureHandler = name => {
    console.log('create: ', name)
    setMaxId(maxId + 1)
  }

  // события по клику на фигуру в рабочей области
  const onFigureClickHandler = (e, figure, index) => {
    e.stopPropagation()
    // заливка кнопки в сайдбаре цветом выбранной фигуры
    setActiveFigure(figure)

    // console.log('click on id: ', figure.id, ' (index: ', index, ')');

    // проверка, нужно ли перемещать выбранную фигуру на передний план относительно других
    if (figure.id < maxId) {
      const f = [...figures]
      f[index].id = maxId + 1
      setFigures(f)
      setMaxId(maxId + 1)
    }
  }

  // сбросить выделение активной фигуры
  const resetActiveFigure = (e) => {
    setActiveFigure(defaultFigure)
  }

  // открыть color picker в сайдбаре
  const colorPickerOpen = () => {
    console.log('open color picker');
  }

  return (
    <main className={style.main}>
      <Sidebar
        createFigureHandler={createFigureHandler}
        activeFigure={activeFigure}
        colorPickerOpen={colorPickerOpen}
        resetActiveFigure={resetActiveFigure}
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