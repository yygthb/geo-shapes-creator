import React from 'react'
import style from './Sidebar.module.css'
import Section from './Section/Section'
import Shapes from './Section/Shapes/Shapes'
import Style from './Section/Style/Style'

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <Section title="Shapes">
        <Shapes />
      </Section>
      <Section title="Style">
        <Style />
      </Section>
    </div>
  )
}

export default Sidebar