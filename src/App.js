import React, { useEffect, useState } from 'react'
import style from './App.module.css'
import Content from './components/Content/Content'
import Sidebar from './components/Sidebar/Sidebar'

function App() {

  // figures in Content area
  const [figures, setFigures] = useState([
    {
      id: 1,
      type: 'rectangle',
      color: 'green',
      position: {
        top: 'calc(50% - 50px)',
        left: 'calc(50% - 100px)'
      }
    },
    {
      id: 2,
      type: 'triangle',
      color: 'red',
      position: {
        top: 'calc(50% + 100px)',
        left: 'calc(50% + 50px)'
      }
    },
  ])

  // регистрация максимального id для задания z-index в стилях (последняя выбранная фигура будет поверх остальных)
  const [maxId, setMaxId] = useState(2)

  // #fff - цвет по умолчанию для кнопки Fill в сайдбаре (в стилях opacity: 0.5)
  const defaultFigure = { id: 0, type: '', color: '#fff' }
  const [activeFigure, setActiveFigure] = useState(defaultFigure)

  const [select, setSelect] = useState(false)

  // Delete keydown listener
  useEffect(() => {
    if (activeFigure.id > 0) {
      console.log('useEffect on; select: ', select)
      console.log('activeFigure: ', activeFigure)
      document.addEventListener('keydown', deleteFigure)
    } else {
      console.log('useEffect off; select: ', select)
      console.log('activeFigure: ', activeFigure)
      return () => document.removeEventListener('keydown', deleteFigure)
    }
  }, [activeFigure])

  // добавление фигуры в массив figures - отображение в рабочей области программы
  // 50px - половина высоты; 100px - половина ширины
  // darkorange - цвет для новой фигуры по-умолчанию
  const createFigureHandler = name => {
    const figuresState = [...figures]
    figuresState.push({
      id: maxId + 1,
      type: name,
      color: 'darkorange',
      position: {
        top: 'calc(50% - 50px)',
        left: 'calc(50% - 100px)'
      }
    })
    setFigures(figuresState)
    setMaxId(maxId + 1)
  }

  function deleteFigure(e) {
    console.log('active figure in listener: ', activeFigure)

    if (e.code === 'Delete') {
      const filteredFigures = figures.filter(figure => figure.id !== activeFigure.id)
      // console.log('filteredFigures: ', filteredFigures)
      setFigures(filteredFigures)
      setActiveFigure(defaultFigure)

      // remove listener
      document.removeEventListener('keydown', deleteFigure)
    }
  }

  // события по клику на фигуру в рабочей области
  const onFigureClickHandler = (e, figure, index) => {
    e.stopPropagation()

    // заливка кнопки в сайдбаре цветом выбранной фигуры
    // console.log('setActiveFigure: ', figure)
    setActiveFigure(figure)
    setSelect(true)

    // проверка, нужно ли перемещать выбранную фигуру на передний план относительно других
    if (figure.id < maxId) {
      const figuresState = [...figures]
      figuresState[index].id = maxId + 1
      setFigures(figuresState)
      setMaxId(maxId + 1)
    }
  }

  const onMoveHandler = (e, figure, index) => {
    e.preventDefault()
    console.log('move figure: ', figure)
    setActiveFigure(figure)
  }

  // переписывать позиционирование двигаемой фигуры (для последующей записи в localstorage)
  const onChangePositionHandler = (index, top, left) => {
    const figuresState = [...figures]
    figuresState[index].position.top = top
    figuresState[index].position.left = left
    setFigures(figuresState)
  }

  // сбросить выделение активной фигуры
  const resetActiveFigure = (e) => {
    setSelect(false)
    document.removeEventListener('keydown', deleteFigure)
    setActiveFigure(defaultFigure)
  }

  // открыть color picker в сайдбаре
  const colorPickerOpen = e => {
    e.stopPropagation()
    console.log('open color picker')
  }

  return (
    <main className={style.main}>
      <Sidebar
        createFigureHandler={createFigureHandler}
        activeFigure={activeFigure}
        colorPickerOpen={colorPickerOpen}
        resetActiveFigure={resetActiveFigure}
      />
      <Content
        figures={figures}
        activeFigure={activeFigure}
        onFigureClickHandler={onFigureClickHandler}
        onMoveHandler={onMoveHandler}
        onChangePositionHandler={onChangePositionHandler}
        resetActiveFigure={resetActiveFigure}
      />
    </main>
  )
}

export default App