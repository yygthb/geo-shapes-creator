import React from 'react'
import style from './Content.module.css'

const Content = props => {
  const activeId = props.activeFigure.id

  // перемещение выделенной фигуры в рабочей области приложения 
  const onMouseDown = (e, figure, index) => {
    // добавление границы к фигуре в момент onmousedown
    props.onFigureClickHandler(e, figure, index)

    // вычисление центра "рабочей области" - позиционирование фигуры относительно этого центра
    const getMidCoordinates = el => {
      const top = el.getBoundingClientRect().top
      const bottom = el.getBoundingClientRect().bottom
      const left = el.getBoundingClientRect().left
      const right = el.getBoundingClientRect().right

      const midY = (bottom - top) / 2
      const midX = (right - left) / 2 + left

      return [midY, midX]
    }

    // центр области Content
    const content = document.querySelector('#content')
    const [midY, midX] = getMidCoordinates(content)

    // svg-фигура для перемещения
    const target = document.querySelector(`#${e.target.className.baseVal}`)

    // координаты для сдвига по осям (корректировка клика мыши в определенную область фигуры)
    let shiftY = e.clientY - target.getBoundingClientRect().top
    let shiftX = e.clientX - target.getBoundingClientRect().left

    // задание координат для абсолютного позиционирования перемещаемой фигуры относительно центра Content
    function moveAt(pageY, pageX) {
      const top = pageY - midY - shiftY + 'px'
      const left = pageX - midX - shiftX + 'px'

      target.style.top = top
      target.style.left = left
    }

    // перемещение фигуры в области Content
    function onMouseMove(e) {
      // moveAt(e.pageY, e.pageX)
      moveAt(e.clientY, e.clientX)
    }

    document.addEventListener('mousemove', onMouseMove)

    target.onmouseup = function () {
      // записать позицию выделенной фигуры в state для сохранения в localStorage
      const top = target.style.top
      const left = target.style.left
      props.onChangePositionHandler(index, top, left)

      document.removeEventListener('mousemove', onMouseMove)
      target.onmouseup = null
    };
  }

  return (
    <div
      className={style.content}
      id="content"
      onClick={e => props.resetActiveFigure(e)}
    >
      <div className={style.content_mid}>
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
                  style={{
                    zIndex: figure.id,
                    top: figure.position.top,
                    left: figure.position.left,
                  }}
                >
                  <polygon points="0,100 100,0 200,100"
                    fill={figure.color || 'grey'}
                    className={`${style[figure.type]}_${figure.id}`}
                    data-index={index}
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
                    style={{
                      zIndex: figure.id,
                      top: figure.position.top,
                      left: figure.position.left
                    }}
                  >
                    <rect x="0" y="0" width="200" height="100"
                      fill={figure.color || 'grey'}
                      className={`${style[figure.type]}_${figure.id}`}
                      data-index={index}
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
      </div>
    </div >
  )
}

export default Content