import { findByPlaceholderText } from '@testing-library/react'
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
      position: {
        top: 'calc(50% - 270px)',
        left: 'calc(50% - 130px)'
      }
    },
    {
      id: 2,
      type: 'triangle',
      color: 'red',
      position: {
        top: 'calc(50% + 100px)',
        left: 'calc(50% + 50px)'
      }
    },
  ])

  // регистрация максимального id для задания z-index в стилях (последняя выбранная фигура будет поверх остальных)
  const [maxId, setMaxId] = useState(2)

  // darkorange - цвет по умолчанию для кнопки Fill в сайдбаре
  const defaultFigure = { id: 0, type: '', color: 'darkorange' }
  const [activeFigure, setActiveFigure] = useState(defaultFigure)

  // добавление фигуры в массив figures - отображение в рабочей области программы
  const createFigureHandler = name => {
    const figuresState = [...figures]
    figuresState.push({
      id: maxId + 1,
      type: name,
      color: 'darkorange',
      position: {
        top: 'calc(50% - 50px)',
        left: 'calc(50% - 100px)'
      }
    })
    setFigures(figuresState)
    setMaxId(maxId + 1)
  }

  // события по клику на фигуру в рабочей области
  const onFigureClickHandler = (e, figure, index) => {
    e.stopPropagation()
    // заливка кнопки в сайдбаре цветом выбранной фигуры
    setActiveFigure(figure)

    // проверка, нужно ли перемещать выбранную фигуру на передний план относительно других
    if (figure.id < maxId) {
      const figuresState = [...figures]
      figuresState[index].id = maxId + 1
      setFigures(figuresState)
      setMaxId(maxId + 1)
    }
  }

  // переписывать позиционирование двигаемой фигуры (для последующей записи в localstorage)
  const onChangePositionHandler = (index, top, left) => {
    const figuresState = [...figures]
    figuresState[index].position.top = top
    figuresState[index].position.left = left
    setFigures(figuresState)
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
        onChangePositionHandler={onChangePositionHandler}
        resetActiveFigure={resetActiveFigure}
      />
    </main>
  );
}

export default App