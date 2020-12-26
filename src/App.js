import React, { useState } from 'react'
import style from './App.module.css'
import Content from './components/Content/Content'
import Sidebar from './components/Sidebar/Sidebar'

const defaultFigure = null
const defaultFillColor = '#FFFFFF'
const newFigureColor = '#FF8C00'

function App() {

  // figures in Content area
  const [figures, setFigures] = useState([
    {
      id: 1,
      type: 'rectangle',
      color: '#008000',
      position: {
        top: 'calc(50% - 50px)',
        left: 'calc(50% - 100px)'
      }
    },
    {
      id: 2,
      type: 'triangle',
      color: '#ff0000',
      position: {
        top: 'calc(50% + 100px)',
        left: 'calc(50% + 50px)'
      }
    },
  ])

  // регистрация максимального id для задания z-index в стилях (последняя выбранная фигура будет поверх остальных)
  const [maxId, setMaxId] = useState(2)

  const [activeFigure, setActiveFigure] = useState(defaultFigure)

  // set Fill background
  const [fillColor, setFillColor] = useState(defaultFillColor)

  // добавление фигуры в массив figures - отображение в рабочей области программы
  // 50px - половина высоты; 100px - половина ширины
  // darkorange - цвет для новой фигуры по-умолчанию
  const createFigureHandler = name => {
    const figuresState = [...figures]
    figuresState.push({
      id: maxId + 1,
      type: name,
      color: newFigureColor,
      position: {
        top: 'calc(50% - 50px)',
        left: 'calc(50% - 100px)'
      }
    })
    setFigures(figuresState)
    setMaxId(maxId + 1)
  }

  // const deleteFigure = e => {
  //   console.log('keydown listener')
  // }

  // события по клику на фигуру в рабочей области
  const onFigureClickHandler = (e, figure, index) => {
    e.stopPropagation()

    // заливка кнопки в сайдбаре цветом выбранной фигуры
    setActiveFigure(figure)
    setFillColor(figure.color)

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
    setFillColor(defaultFillColor)
  }

  // Color Picker
  const onColorChange = e => {
    setFillColor(e.target.value)

    const { id } = activeFigure
    const prevFigures = [...figures]
    // const active = prevFigures.filter(fig => fig.id === id)[0]
    const index = prevFigures.findIndex(figure => figure.id === id)
    prevFigures[index].color = e.target.value
    setFigures(prevFigures)
  }

  // Удаление выделенного объекта по нажатию на 'Delete'
  const onKeyDown = (e, index) => {
    if (e.code === 'Delete') {
      const prevFigures = [...figures]
      prevFigures.splice(index, 1)
      setFigures(prevFigures)
      setActiveFigure(defaultFigure)
      setFillColor(defaultFillColor)
    }
  }

  // window.figures = figures
  // window.activeFigure = activeFigure

  return (
    <main className={style.main}>
      <Sidebar
        createFigureHandler={createFigureHandler}
        activeFigure={activeFigure}
        color={fillColor}
        onColorChange={onColorChange}
        resetActiveFigure={resetActiveFigure}
      />
      <Content
        figures={figures}
        activeFigure={activeFigure}
        onFigureClickHandler={onFigureClickHandler}
        onChangePositionHandler={onChangePositionHandler}
        resetActiveFigure={resetActiveFigure}
        onKeyDown={onKeyDown}
      />
    </main>
  )
}

export default App