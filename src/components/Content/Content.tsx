import React from 'react'
import { connect } from 'react-redux'
import { GetStateType } from '../..'
import { FigureType, GetActiveFigureType } from '../../types'
import Rectangle from '../Figures/Rectangle'
import Triangle from '../Figures/Triangle'
import style from './Content.module.css'
import { getactiveFigure, resetActiveFigure, onSavePosition, onDeleteKeyDownListener } from '../../redux/actions/actionCreators'

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

  resetActiveFigure: () => void
  getActiveFigure: (obj: GetActiveFigureType) => void
  onSavePosition: (index: number, top: string, left: string) => void
  onDeleteKeyDownListener: (eCode: string, index: number) => void
}

const Content: React.FC<Props> = props => {
  let activeId: number = 0
  if (props.activeFigure !== null) {
    activeId = props.activeFigure.zIndexCSS
  }
  const contentRef = React.createRef<HTMLDivElement>()

  // события по клику на фигуру в рабочей области
  const onFigureClickHandler = (e: React.MouseEvent, figure: FigureType, index: number) => {
    e.stopPropagation()
    props.getActiveFigure({ figure, index })
  }

  // Удаление выделенной фигуры по нажатию на кнопку клавиатуры (Delete)
  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    props.onDeleteKeyDownListener(e.code, index)
  }

  // переписывать позиционирование двигаемой фигуры (для последующей записи в localstorage)
  const onChangePositionHandler = (index: number, top: string, left: string) => {
    props.onSavePosition(index, top, left)
  }

  // const onMouseDown = (e, figure, index) => {
  const onMouseDown: any = (e: React.MouseEvent, figure: FigureType, index: number) => {
    onFigureClickHandler(e, figure, index)

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
      onChangePositionHandler(index, top, left)
      target.onmouseup = null
    };
  }

  return (
    <div
      className={style.content}
      ref={contentRef}
      onClick={e => props.resetActiveFigure()}
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
                  onFigureClickHandler={onFigureClickHandler}
                  onKeyDown={onKeyDown}
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
                    onFigureClickHandler={onFigureClickHandler}
                    onKeyDown={onKeyDown}
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

const mapStateToProps = (state: GetStateType) => {
  return {
    figures: state.figuresState.figures,
    activeFigure: state.figuresState.activeFigure,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getActiveFigure: (value: GetActiveFigureType) => dispatch(getactiveFigure(value)),
    resetActiveFigure: () => dispatch(resetActiveFigure()),
    onSavePosition: (index: number, top: string, left: string) => dispatch(onSavePosition(index, top, left)),
    onDeleteKeyDownListener: (eCode: string, index: number) => dispatch(onDeleteKeyDownListener(eCode, index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)