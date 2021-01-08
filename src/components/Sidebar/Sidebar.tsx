import React from 'react'
import { FigureType } from '../../types'
import style from './Sidebar.module.css'
import Section from './Section/Section'
import Shapes from './Section/Shapes/Shapes'
import Style from './Section/Style/Style'

type Props = {
  color: string
  resetActiveFigure: () => void
  createFigureHandler: (e: any, name: any) => void
  activeFigure: null | FigureType
  onColorChange: (e: any) => void
}

const Sidebar: React.FC<Props> = (props: any) => {
  return (
    <div
      className={style.sidebar}
      onClick={props.resetActiveFigure}
    >
      <Section title="Shapes">
        <Shapes createFigureHandler={props.createFigureHandler} />
      </Section>
      <Section title="Style">
        <Style
          activeFigure={props.activeFigure}
          onColorChange={props.onColorChange}
          color={props.color}
        />
      </Section>
    </div>
  )
}

export default Sidebar