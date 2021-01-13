import React from 'react'
import { FigureType } from '../../types'
import Rectangle from '../Figures/Rectangle'
import Triangle from '../Figures/Triangle'
import style from './Content.module.css'

// вычисление центра "рабочей области" - позиционирование фигуры относительно этого центра
const getMidCoordinates = (el: any) => {
  const { top, bottom, left, right } = el.getBoundingClientRect()

  const midY = (bottom - top) / 2
  const midX = (right - left) / 2 + left

  return [midY, midX]
}

type Props = {
  activeFigure: null | FigureType
  figures: Array<FigureType>

  resetActiveFigure: (e: React.MouseEvent) => void
  onKeyDown: (e: any, index: any) => void
  onFigureClickHandler: (e: React.MouseEvent, figure: FigureType, index: number) => void
  onChangePositionHandler: (index: number, top: string, left: string) => void
}

const Content: React.FC<Props> = props => {
  // const activeId = props.activeFigure !== null ? props.activeFigure.id : 0
  let activeId: number = 0
  if (props.activeFigure !== null) {
    activeId = props.activeFigure.zIndexCSS
  }
  const contentRef = React.createRef<HTMLDivElement>()

  // const onMouseDown = (e, figure, index) => {
  const onMouseDown: any = (e: React.MouseEvent, figure: FigureType, index: number) => {
    props.onFigureClickHandler(e, figure, index)

    // центр области Content
    const [midY, midX] = getMidCoordinates(contentRef.current)

    // svg-фигура для перемещения
    const target: any = e.currentTarget.parentNode

    // координаты для сдвига по осям (корректировка клика мыши в определенную область фигуры)
    let shiftY = e.clientY - target.getBoundingClientRect().top
    let shiftX = e.clientX - target.getBoundingClientRect().left

    // позиционирование фигуры при перемещении
    const moveFigureAt = (e: any) => {
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
            if (figure.zIndexCSS === activeId) {
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

export default Content