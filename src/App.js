import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import style from './App.module.css'
import Content from './components/Content/Content'
import Sidebar from './components/Sidebar/Sidebar'
import { addNewFigure, getactiveFigure, resetActiveFigure, onSavePosition, getNewColorToFigure, onDeleteKeyDownListener } from './redux/actions/actionCreators'

function App(props) {

  // добавление фигуры в рабочую область приложения
  const createFigureHandler = (e, name) => {
    e.stopPropagation()
    props.addNewFigure(name)
  }

  // события по клику на фигуру в рабочей области
  const onFigureClickHandler = (e, figure, index) => {
    e.stopPropagation()
    props.getActiveFigure({ figure, index })
  }

  // переписывать позиционирование двигаемой фигуры (для последующей записи в localstorage)
  const onChangePositionHandler = (index, top, left) => {
    props.onSavePosition(index, top, left)
  }

  // сбросить выделение активной фигуры
  const resetActiveFigure = (e) => {
    props.resetActiveFigure()
  }

  // Color Picker
  const onColorChange = e => {
    props.getNewColorToFigure(e.target.value)
  }

  // Удаление выделенной фигуры по нажатию на кнопку клавиатуры
  const onKeyDown = (e, index) => {
    props.onDeleteKeyDownListener(e.code, index)
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
    </main>
  )
}

App.propTypes = {
  activeFigure: PropTypes.object,
  fillColor: PropTypes.string.isRequired,
  figures: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    color: PropTypes.string,
    position: PropTypes.shape({
      top: PropTypes.string,
      left: PropTypes.string,
    }),
  })).isRequired
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
    addNewFigure: name => dispatch(addNewFigure(name)),
    getActiveFigure: value => dispatch(getactiveFigure(value)),
    resetActiveFigure: () => dispatch(resetActiveFigure()),
    onSavePosition: (index, top, left) => dispatch(onSavePosition(index, top, left)),
    getNewColorToFigure: (color) => dispatch(getNewColorToFigure(color)),
    onDeleteKeyDownListener: (eCode, index) => dispatch(onDeleteKeyDownListener(eCode, index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)