import React from 'react'
import { FigurePropsType } from '../../types'

const style: any = {}

const Triangle: React.FC<FigurePropsType> = ({ classes, figure, index, ...props }) => {
  return (
    <svg width="200" height="100"
      className={classes.join(' ')}
      id={`${style[figure.type]}_${figure.zIndexCSS}`}
      style={{
        zIndex: figure.zIndexCSS,
        top: figure.position.top,
        left: figure.position.left,
      }}
    >
      <polygon points="0,100 100,0 200,100"
        fill={figure.color || 'grey'}
        className={`${style[figure.type]}_${figure.zIndexCSS}`}
        style={{
          cursor: 'pointer',
          outline: 'none',
          pointerEvents: 'all'
        }}
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

export default Triangle