import PropTypes from 'prop-types'
import style from './Shapes.module.css'

const Shapes = props => {
  return (
    <>
      <div
        className={style.createButton + ' ' + style.rectangle}
        title="create rectangle"
        onClick={e => {
          props.createFigureHandler(e, 'rectangle')
        }}
      ></div>
      <div
        className={style.createButton + ' ' + style.triangle}
        title="create triangle"
        onClick={e => {
          props.createFigureHandler(e, 'triangle')
        }}
      ></div>
    </>
  )
}

Shapes.propTypes = {
  createFigureHandler: PropTypes.func
}

export default Shapes