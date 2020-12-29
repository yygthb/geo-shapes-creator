import React from 'react'
import PropTypes from 'prop-types'
import Rectangle from '../Figures/Rectangle'
import Triangle from '../Figures/Triangle'
import style from './Content.module.css'

// вычисление центра "рабочей области" - позиционирование фигуры относительно этого центра
const getMidCoordinates = el => {
  // const top = el.getBoundingClientRect().top
  // const bottom = el.getBoundingClientRect().bottom
  // const left = el.getBoundingClientRect().left
  // const right = el.getBoundingClientRect().right
  const { top, bottom, left, right } = el.getBoundingClientRect()

  const midY = (bottom - top) / 2
  const midX = (right - left) / 2 + left

  return [midY, midX]
}

const Content = props => {
  const activeId = props.activeFigure !== null ? props.activeFigure.id : 0
  const contentRef = React.createRef()

  const onMouseDown = (e, figure, index) => {
    props.onFigureClickHandler(e, figure, index)

    // центр области Content
    const [midY, midX] = getMidCoordinates(contentRef.current)

    // svg-фигура для перемещения
    const target = e.currentTarget.parentNode

    // координаты для сдвига по осям (корректировка клика мыши в определенную область фигуры)
    let shiftY = e.clientY - target.getBoundingClientRect().top
    let shiftX = e.clientX - target.getBoundingClientRect().left

    // позиционирование фигуры при перемещении
    const moveFigureAt = e => {
      target.style.top = e.pageY - midY - shiftY + 'px'
      target.style.left = e.pageX - midX - shiftX + 'px'
    }

    document.addEventListener('mousemove', moveFigureAt)

    target.onmouseup = function () {
      document.removeEventListener('mousemove', moveFigureAt)

      // сохранить позицию фигуры
      const top = target.style.top
      const left = target.style.left
      props.onChangePositionHandler(index, top, left)
      target.onmouseup = null
    };
  }

  return (
    <div
      className={style.content}
      ref={contentRef}
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
                // треугольники
                <Triangle key={index}
                  classes={classes}
                  index={index}
                  figure={figure}
                  onMouseDown={onMouseDown}
                  onFigureClickHandler={props.onFigureClickHandler}
                  onKeyDown={props.onKeyDown}
                />
                :
                // прямоугольники
                figure.type === 'rectangle'
                  ?
                  <Rectangle key={index}
                    classes={classes}
                    index={index}
                    figure={figure}
                    onMouseDown={onMouseDown}
                    onFigureClickHandler={props.onFigureClickHandler}
                    onKeyDown={props.onKeyDown}
                  />
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

Content.propTypes = {
  activeFigure: PropTypes.object,
  figures: PropTypes.arrayOf(PropTypes.object)

}

export default Content