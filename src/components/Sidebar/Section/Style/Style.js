import PropTypes from 'prop-types'
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
        title="Color Picker"
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

Style.propTypes = {
  activeFigure: PropTypes.object,
  color: PropTypes.string.isRequired,
  onColorChange: PropTypes.func
}

export default Style