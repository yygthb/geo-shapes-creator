import React from 'react'
import style from './Sidebar.module.css'
import Section from './Section/Section'
import Shapes from './Section/Shapes/Shapes'
import Style from './Section/Style/Style'

const Sidebar = props => {
  return (
    <div className={style.sidebar}>
      <Section title="Shapes">
        <Shapes createFigureHandler={props.createFigureHandler} />
      </Section>
      <Section title="Style">
        <Style
          activeFigure={props.activeFigure}
          colorPickerOpen={props.colorPickerOpen}
        />
      </Section>
    </div>
  )
}

export default Sidebar