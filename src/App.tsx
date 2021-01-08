import React from 'react'
import { connect } from 'react-redux'
import style from './App.module.css'
import Content from './components/Content/Content'
import Sidebar from './components/Sidebar/Sidebar'
import { addNewFigure, getactiveFigure, resetActiveFigure, onSavePosition, getNewColorToFigure, onDeleteKeyDownListener } from './redux/actions/actionCreators'
import { FigureType, GetActiveFigureType } from './types'
import { GetStateType } from './index'

type Props = {
  activeFigure: null | FigureType
  fillColor: string
  figures: Array<FigureType>

  addNewFigure: (name: string) => void
  resetActiveFigure: () => void
  getActiveFigure: (obj: GetActiveFigureType) => void
  onSavePosition: (index: number, top: string, left: string) => void
  getNewColorToFigure: (color: string) => void
  onDeleteKeyDownListener: (eCode: string, index: number) => void
}

const App: React.FC<Props> = (props) => {

  // добавление фигуры в рабочую область приложения
  const createFigureHandler = (e: React.MouseEvent, name: string) => {
    e.stopPropagation()
    props.addNewFigure(name)
  }

  // события по клику на фигуру в рабочей области
  const onFigureClickHandler = (e: React.MouseEvent, figure: FigureType, index: number) => {
    e.stopPropagation()
    props.getActiveFigure({figure, index})
  }

  // переписывать позиционирование двигаемой фигуры (для последующей записи в localstorage)
  const onChangePositionHandler = (index: number, top: string, left: string) => {
    props.onSavePosition(index, top, left)
  }

  // сбросить выделение активной фигуры
  const resetActiveFigure = () => {
    props.resetActiveFigure()
  }

  // Color Picker
  const onColorChange = (e: React.FormEvent<HTMLInputElement>) => {
    props.getNewColorToFigure(e.currentTarget.value)
  }

  // Удаление выделенной фигуры по нажатию на кнопку клавиатуры
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
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

const mapStateToProps = (state: GetStateType) => {
  return {
    figures: state.figuresState.figures,
    maxId: state.figuresState.maxId,
    activeFigure: state.figuresState.activeFigure,
    fillColor: state.fillColorState.fillColor,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNewFigure: (name: string) => dispatch(addNewFigure(name)),
    getActiveFigure: (value: GetActiveFigureType) => dispatch(getactiveFigure(value)),
    resetActiveFigure: () => dispatch(resetActiveFigure()),
    onSavePosition: (index: number, top: string, left: string) => dispatch(onSavePosition(index, top, left)),
    getNewColorToFigure: (color: string) => dispatch(getNewColorToFigure(color)),
    onDeleteKeyDownListener: (eCode: string, index: number) => dispatch(onDeleteKeyDownListener(eCode, index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)