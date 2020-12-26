import React from 'react'
import Rectangle from '../Figures/Rectangle'
import Triangle from '../Figures/Triangle'
import style from './Content.module.css'

const Content = props => {
  const activeId = props.activeFigure !== null ? props.activeFigure.id : 0

  /*
  ВНИМАНИЕ!
  Все константы и функции в теле функционального компонента всегда создаются заново при каждом
  рендеринге! Чтобы это обойти используют хуки.
   */
  // перемещение выделенной фигуры в рабочей области приложения
  const onMouseDown = (e, figure, index) => {
    //  ||  при перемещении фигура получает класс "active" - добавляются границы
    //  ||  при нажатии Delete фигура удаляется (даже если не выделена)
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

    // В react так не делают! Не работают с DOM напрямую.
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

    /*
    Функция создается заново!
     */
    // перемещение фигуры в области Content
    function onMouseMove(e) {
      // moveAt(e.pageY, e.pageX)
      moveAt(e.clientY, e.clientX)
    }

    // Вот здесь повесился обработчик на только что созданную функцию, и потом еще раз повеситься
    // на еще одну созданную функцию, и еще... Каждый раз при рендеринге!
    document.addEventListener('mousemove', onMouseMove)

    // Здесь заново создается обработчик, старый забывается и значит removeEventListener для
    // прошлого значения не выполнится!
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
                // треугольники
                <Triangle key={index}
                  classes={classes}
                  index={index}
                  figure={figure}
                  onMouseDown={onMouseDown}
                  onFigureClickHandler={props.onFigureClickHandler}
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
