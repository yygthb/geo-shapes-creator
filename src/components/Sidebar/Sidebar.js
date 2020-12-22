import React from 'react'
import style from './Sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
      <section className={style.section}>
        <h2 className={style.section_title}>
          Shapes
        </h2>
        <div className={style.section_content}>
          <div
            className={style.createButton + ' ' + style.rectangle}
            title="create rectangle"
          ></div>
          <div
            className={style.createButton + ' ' + style.triangle}
            title="create triangle"
          ></div>
        </div>
      </section>
      <section className={style.section}>
        <h2 className={style.section_title}>
          Style
        </h2>
        <div className={style.section_content}>
          <span className={style.property}>Fill</span>
          <button 
            className={style.fill}
            title="open pallet"
          ></button>
        </div>
      </section>
    </div>
  )
}

export default Sidebar