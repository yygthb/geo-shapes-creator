import React from 'react'
import {connect} from 'react-redux'
import style from './App.module.css'
import Content from './components/Content/Content'
import Sidebar from './components/Sidebar/Sidebar'
import { addNewFigure, getactiveFigure, incMaxId, zIndexUpdateHandler, resetActiveFigure, setDefaultFillColor, setFillColor, onSavePosition, getNewColorToFigure, onKeyDownListener } from './redux/actions/actionCreators'

function App (props) {

  // добавление фигуры в рабочую область приложения
  const createFigureHandler = name => props.addNewFigure(name)

  // события по клику на фигуру в рабочей области
  const onFigureClickHandler = (e, figure, index) => {
    e.stopPropagation()
    // заливка кнопки в сайдбаре цветом выбранной фигуры
    props.setFillColor(figure.color)
    // сохранение выделенной фигуры
    props.getActiveFigure(figure)
    // проверка, нужно ли перемещать выбранную фигуру на передний план относительно других
    props.zIndexUpdateHandler(figure.id, index)
  }

  // переписывать позиционирование двигаемой фигуры (для последующей записи в localstorage)
  const onChangePositionHandler = (index, top, left) => {
    props.onSavePosition(index, top, left)
  }

  // сбросить выделение активной фигуры
  const resetActiveFigure = (e) => {
    props.resetActiveFigure()
    props.setDefaultFillColor()
  }

  // Color Picker
  const onColorChange = e => {
    props.setFillColor(e.target.value)
    props.getNewColorToFigure(e.target.value)
  }

  // Удаление выделенного объекта по нажатию на кнопку клавиатуры
  const onKeyDown = (e, index) => {
    props.onKeyDownListener(e.code, index)
  }

  return (
    <main className={style.main}>
      <Sidebar
        createFigureHandler={createFigureHandler}
        activeFigure={props.activeFigure}
        color={props.fillColor}
        onColorChange={onColorChange}
        resetActiveFigure={resetActiveFigure}
      />
      <Content
        figures={props.figures}
        activeFigure={props.activeFigure}
        onFigureClickHandler={onFigureClickHandler}
        onChangePositionHandler={onChangePositionHandler}
        resetActiveFigure={resetActiveFigure}
        onKeyDown={onKeyDown}
      />
      {/* CONSOLE_LOG_PROPS */}
      <button style={{height: '5%'}} onClick={() => {
        console.log(props)
      }}>
      {/* /CONSOLE_LOG_PROPS */}
        props
      </button>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    figures: state.figuresState.figures,
    maxId: state.figuresState.maxId,
    activeFigure: state.figuresState.activeFigure,
    fillColor: state.fillColorState.fillColor,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // figures
    addNewFigure: name => dispatch(addNewFigure(name)),
    incMaxId: () => dispatch(incMaxId()),
    getActiveFigure: figure => dispatch(getactiveFigure(figure)),
    resetActiveFigure: () => dispatch(resetActiveFigure()),
    zIndexUpdateHandler: (id, index) => dispatch(zIndexUpdateHandler(id, index)),
    onSavePosition: (index, top, left) => dispatch(onSavePosition(index, top, left)),
    getNewColorToFigure: (color) => dispatch(getNewColorToFigure(color)),
    onKeyDownListener: (eCode, index) => dispatch(onKeyDownListener(eCode, index)),

    // fill color
    setDefaultFillColor: () => dispatch(setDefaultFillColor()),
    setFillColor: color => dispatch(setFillColor(color)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)