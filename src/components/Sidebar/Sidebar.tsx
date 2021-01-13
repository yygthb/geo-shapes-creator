import React from 'react'
import { connect } from 'react-redux'
import style from './Sidebar.module.css'
import Section from './Section/Section'
import Shapes from './Section/Shapes/Shapes'
import Style from './Section/Style/Style'
import { FigureType } from '../../types'
import { GetStateType } from '../../index'
import { addNewFigure, resetActiveFigure, getNewColorToFigure } from '../../redux/actions/actionCreators'

type Props = {
  activeFigure: null | FigureType
  fillColor: string

  addNewFigure: (name: string) => void
  resetActiveFigure: () => void
  getNewColorToFigure: (color: string) => void
}

const Sidebar: React.FC<Props> = (props: any) => {
  // добавление фигуры в рабочую область приложения
  const createFigureHandler = (e: React.MouseEvent, name: string) => {
    props.addNewFigure(name)
  }

  // Color Picker
  const onColorChange = (e: React.FormEvent<HTMLInputElement>) => {
    props.getNewColorToFigure(e.currentTarget.value)
  }

  // сбросить выделение активной фигуры
  const resetActiveFigure = () => {
    props.resetActiveFigure()
  }

  return (
    <div
      className={style.sidebar}
      onClick={resetActiveFigure}
    >
      <Section title="Shapes">
        <Shapes createFigureHandler={createFigureHandler} />
      </Section>
      <Section title="Style">
        <Style
          activeFigure={props.activeFigure}
          onColorChange={onColorChange}
          color={props.fillColor}
        />
      </Section>
    </div>
  )
}

const mapStateToProps = (state: GetStateType) => {
  return {
    activeFigure: state.figuresState.activeFigure,
    fillColor: state.fillColorState.fillColor,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addNewFigure: (name: string) => dispatch(addNewFigure(name)),
    resetActiveFigure: () => dispatch(resetActiveFigure()),
    getNewColorToFigure: (color: string) => dispatch(getNewColorToFigure(color)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)