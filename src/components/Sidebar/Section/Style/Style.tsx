import React from 'react'
import { FigureType } from '../../../../types'
import style from './Style.module.css'

type Props = {
  activeFigure: null | FigureType
  color: string
  onColorChange: (e: React.FormEvent<HTMLInputElement>) => void
}

const Style: React.FC<Props> = props => {
  // инпут неактивный, если фигура не выбрана
  const disabled = props.activeFigure === null ? true : false

  return (
    <>
      <label className={style.property}>Fill</label>
      <input type="color"
        disabled={disabled}
        className={style.input}
        title="Color Picker"
        value={props.color}
        style={{
          backgroundColor: props.color
        }}
        onClick={(e: React.MouseEvent) => {
          // остановить "сброс выбранной фигуры"
          e.stopPropagation()
        }}
        onChange={props.onColorChange}
      />
    </>
  )
}

export default Style