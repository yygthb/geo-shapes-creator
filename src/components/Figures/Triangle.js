import React from 'react'
import PropTypes from 'prop-types'
const style = {}

const Triangle = ({classes, figure, index, ...props}) => {
  return (
    <svg width="200" height="100"
      className={classes.join(' ')}
      id={`${style[figure.type]}_${figure.id}`}
      style={{
        zIndex: figure.id,
        top: figure.position.top,
        left: figure.position.left,
      }}
    >
      <polygon points="0,100 100,0 200,100"
        fill={figure.color || 'grey'}
        className={`${style[figure.type]}_${figure.id}`}
        style={{ cursor: 'pointer', outline: 'none' }}
        onMouseDown={e => {
          props.onMouseDown(e, figure, index)
        }}
        onClick={(e) => props.onFigureClickHandler(e, figure, index)}
        onContextMenu={e => e.preventDefault()}
        onDragStart={e => e.preventDefault()}
        tabIndex={index}
        onKeyDown={e => props.onKeyDown(e, index)}
      />
    </svg>
  )
}

Triangle.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.string),
  figure: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onkeydown: PropTypes.func
}

export default Triangle