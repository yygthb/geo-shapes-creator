import React from 'react'
import PropTypes from 'prop-types'
const style = {}

const Rectangle = ({classes, figure, index, ...props}) => {

  return (
    <svg width="200" height="100"
      draggable="true"
      ref={props.activeFigureRef}
      className={classes.join(' ')}
      id={`${style[figure.type]}_${figure.id}`}
      style={{
        zIndex: figure.id,
        top: figure.position.top,
        left: figure.position.left
      }}
    >
      <rect x="0" y="0" width="200" height="100"
        fill={figure.color || 'grey'}
        className={`${style[figure.type]}_${figure.id}`}
        style={{ cursor: 'pointer', outline: 'none' }}
        onMouseDown={e => {
          props.onMouseDown(e, figure, index)
        }}
        onClick={(e) => props.onFigureClickHandler(e, figure, index)}
        onDragStart={e => e.preventDefault()}
        tabIndex={index}
        onKeyDown={e => props.onKeyDown(e, index)}
      />
    </svg>
  )
}

Rectangle.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
  figure: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onkeydown: PropTypes.func
}

export default Rectangle