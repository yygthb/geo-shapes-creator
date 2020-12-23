import React from 'react'
import style from './Content.module.css'

const Content = props => {
  const activeId = props.activeFigure.id

  return (
    <div
      className={style.content}
      onClick={e => props.resetActiveFigure(e)}
    >
      {
        props.figures.map((figure, index) => {
          const classes = [style[figure.type]]
          if (figure.id === activeId) {
            classes.push(style.active)
          }

          return (
            figure.type === 'triangle'
              ?
              <svg key={index} width="200" height="100"
                className={classes.join(' ')}
                style={{ zIndex: figure.id }}
              >
                <polygon points="0,100 100,0 200,100"
                  fill={figure.color || 'grey'}
                  style={{ outline: 'none', cursor: 'pointer' }}
                  onClick={(e) => props.onFigureClickHandler(e, figure)}
                />
              </svg>
              :
              figure.type === 'rectangle'
                ?
                <svg key={index} width="200" height="100"
                  className={classes.join(' ')}
                  style={{ zIndex: figure.id, cursor: 'pointer' }}
                >
                  <rect x="0" y="0" width="200" height="100"
                    fill={figure.color || 'grey'}
                    onClick={(e) => props.onFigureClickHandler(e, figure)}
                  />
                </svg>
                :
                null
          )
        })
      }
    </div >
  )
}

export default Content