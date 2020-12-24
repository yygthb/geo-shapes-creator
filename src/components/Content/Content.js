import React from 'react'
import style from './Content.module.css'

const Content = props => {
  const activeId = props.activeFigure.id

  // mousedown
  const onMouseDown = (e, figure, index) => {
    // добавление границы к фигуре в момент onmousedown
    props.onFigureClickHandler(e, figure, index)

    // получить id фигуры для ее перемещения
    const target = document.querySelector(`#${e.target.className.baseVal}`)

    // высчитать координаты для сдвига по осям (клик мыши в определенную область фигуры)
    let shiftX = e.clientX - target.getBoundingClientRect().left;
    let shiftY = e.clientY - target.getBoundingClientRect().top;

    // задание координат для абсолютного позиционирования перемещаемой фигуры (256px - ширина Sidebar)
    function moveAt(pageX, pageY) {
      target.style.left = pageX - 256 - shiftX + 'px';
      target.style.top = pageY - shiftY + 'px';
    }

    // moveAt(e.pageX, e.pageY)

    // перемещение фигуры в области Content
    function onMouseMove(e) {
      moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    target.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      target.onmouseup = null;
    };
  }

  return (
    <div
      className={style.content}
      onClick={e => props.resetActiveFigure(e)}
    >
      {
        props.figures.map((figure, index) => {
          const classes = [style[figure.type]]
          // добавление border'a к выделенной фигуре
          if (figure.id === activeId) {
            classes.push(style.active)
          }

          return (
            figure.type === 'triangle'
              ?
              // для треугольников:
              <svg key={index} width="200" height="100"
                className={classes.join(' ')}
                id={`${style[figure.type]}_${figure.id}`}
                style={{ zIndex: figure.id }}
              >
                <polygon points="0,100 100,0 200,100"
                  fill={figure.color || 'grey'}
                  className={`${style[figure.type]}_${figure.id}`}
                  style={{ cursor: 'pointer' }}
                  onMouseDown={e => {
                    onMouseDown(e, figure, index)
                  }}
                  onClick={(e) => props.onFigureClickHandler(e, figure, index)}
                  onDragStart={e => e.preventDefault()}
                />
              </svg>
              :
              figure.type === 'rectangle'
                ?
                // для прямоугольников:
                <svg key={index} width="200" height="100"
                  draggable="true"
                  className={classes.join(' ')}
                  id={`${style[figure.type]}_${figure.id}`}
                  style={{ zIndex: figure.id }}
                >
                  <rect x="0" y="0" width="200" height="100"
                    fill={figure.color || 'grey'}
                    className={`${style[figure.type]}_${figure.id}`}
                    style={{ cursor: 'pointer' }}
                    onMouseDown={e => {
                      onMouseDown(e, figure, index)
                    }}
                    onClick={(e) => props.onFigureClickHandler(e, figure, index)}
                    onDragStart={e => e.preventDefault()}
                  />
                </svg>
                :
                // в остальных случаях:
                null
          )
        })
      }
    </div >
  )
}

export default Content