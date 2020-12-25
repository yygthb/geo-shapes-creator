import style from './Style.module.css'

const Style = props => {
  // инпут неактивный, если фигура не выбрана
  const disabled = props.activeFigure === null ? true : false

  return (
    <>
      <label className={style.property}>Fill</label>
      <input type="color" 
        disabled={disabled}
        className={style.input} 
        value={props.color}
        style={{
          backgroundColor: props.color
        }}
        onClick={e => {
          // остановить "сброс выбранной фигуры"
          e.stopPropagation()
        }}
        onChange={props.onColorChange}
      />
    </>
  )
}

export default Style