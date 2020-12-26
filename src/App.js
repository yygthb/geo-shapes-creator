import React, { useState } from 'react'
import {connect} from 'react-redux'
import style from './App.module.css'
import Content from './components/Content/Content'
import Sidebar from './components/Sidebar/Sidebar'

const defaultFigure = null

function App (props) {

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

  // добавление фигуры в массив figures - отображение в рабочей области программы
  // 50px - половина высоты; 100px - половина ширины
  const createFigureHandler = name => props.addNewFigure(name)

  // события по клику на фигуру в рабочей области
  const onFigureClickHandler = (e, figure, index) => {
    e.stopPropagation()

    // заливка кнопки в сайдбаре цветом выбранной фигуры
    props.setFillColor(figure.color)

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
    props.setDefaultFillColor()
  }

  // Color Picker
  const onColorChange = e => {
    props.setFillColor(e.target.value)

    const { id } = activeFigure
    const prevFigures = [...figures]
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
      props.setDefaultFillColor()
    }
  }

  window.props = props

  return (
    <main className={style.main}>
      <Sidebar
        createFigureHandler={createFigureHandler}
        activeFigure={activeFigure}
        color={props.fillColor}
        onColorChange={onColorChange}
        resetActiveFigure={resetActiveFigure}
      />
      <Content
        figures={props.figures}
        activeFigure={activeFigure}
        onFigureClickHandler={onFigureClickHandler}
        onChangePositionHandler={onChangePositionHandler}
        resetActiveFigure={resetActiveFigure}
        onKeyDown={onKeyDown}
      />
    </main>
  )
}

const mapStateToProps = state => {
  return {
    fillColor: state.fillColorState.fillColor,
    figures: state.figuresState.figures,
    maxId: state.figuresState.maxId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFigures: () => dispatch({ type: 'GET_FIGURES' }),
    addNewFigure: name => dispatch({ type: 'ADD_NEW_FIGURE', value: name }),
    setDefaultFillColor: () => dispatch({ type: 'SET_DEFAULT_FILL_COLOR' }),
    setFillColor: color => dispatch({ type: 'SET_FILL_COLOR', value: color }),
    incMaxId: () => dispatch({ type: 'INC_MAX_ID' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)