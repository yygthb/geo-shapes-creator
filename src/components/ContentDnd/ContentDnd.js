// import React, { useEffect, useState } from 'react'
// import style from './ContentDnd.module.css'

// // вычисление центра "рабочей области" - позиционирование фигуры относительно этого центра
// const getMidCoordinates = el => {
//   const top = el.getBoundingClientRect().top
//   const bottom = el.getBoundingClientRect().bottom
//   const left = el.getBoundingClientRect().left
//   const right = el.getBoundingClientRect().right
//   const midY = (bottom - top) / 2
//   const midX = (right - left) / 2 + left
//   return [midY, midX]
// }

// const ContentDnd = props => {
  
//   const [coord, setCoord] = useState({
//     top: '0px',
//     left: '0px'
//   })
//   const [shift, setShift] = useState({
//     top: 0,
//     left: 0
//   })
//   const [mid, setMid] = useState({
//     top: 0,
//     left: 0
//   })
//   const [classes, setClasses] = useState([style.box, style.active])

//   useEffect(() => {
//     const [midY, midX] = getMidCoordinates(contentRef.current)
//     setMid({
//       top: midY,
//       left: midX
//     })
//   }, [])

//   const boxRef = React.createRef()
//   const contentRef = React.createRef()

//   const onDragStart = (e) => {
//     console.log('drag start')
//     const target = boxRef.current
//     const shiftTop = e.clientY - target.getBoundingClientRect().top
//     const shiftLeft = e.clientX - target.getBoundingClientRect().left
//     setShift({
//       top: shiftTop,
//       left: shiftLeft
//     })
//     const [midY, midX] = getMidCoordinates(contentRef.current)
//     setMid({
//       top: midY,
//       left: midX
//     })
//   }

//   const onDrag = (e) => {
//     console.log('drag')
//     const target = boxRef.current

//     document.ondragover = function(e) {
//       target.style.top = `${e.clientY - mid.top - shift.top}px`
//       target.style.left = `${e.clientX - mid.left - shift.left}px`
//     }
//   }

//   const onDragEnd = e => {
//     console.log('drag end')
//     const target = boxRef.current
//     const top = target.style.top
//     const t = +top.substring(0, top.length - 2)
//     setCoord({
//       top: target.style.top,
//       left: target.style.left
//     })
//     setShift({
//       top: 0,
//       left: 0
//     })
//   }

//   const showState = e => {
//     console.log('coord: ', coord)
//     console.log('shift: ', shift)
//     console.log('mid: ', mid)
//   }

//   return (
//     <div
//       className={style.content}
//       id="content"
//       ref={contentRef}
//     >
//       <div className={style.content_mid}>
//         <div
//           className={classes.join(' ')}
//           draggable={true}
//           ref={boxRef}
//           style={{
//             top: `${coord.top}`,
//             left: `${coord.left}`
//           }}

//           onDragStart={e => {
//             onDragStart(e)
//           }}
//           onDrag={e => {
//             onDrag(e)
//           }}
//           onDragEnd={e => {
//             console.log('onDragEnd :', e.type)
//             onDragEnd(e)
//           }}
//           // onDrag={e => {
//           //   onDrag(e)
//           // }}
//           onClick={showState}

//         >BOX</div>
//       </div>
//       <button
//         style={{
//           position: 'absolute',
//           right: 0,
//           bottom: 0
//         }}
//         onClick={showState}
//       >state</button>
//     </div >
//   )
// }

// export default ContentDnd


// 2

import React, { useEffect, useState } from 'react'
import style from './ContentDnd.module.css'

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

const ContentDnd = props => {
  
  const [coord, setCoord] = useState({
    top: 0,
    left: 0
  })
  const [shift, setShift] = useState({
    top: 0,
    left: 0
  })
  const [mid, setMid] = useState({
    top: 0,
    left: 0
  })
  const [classes, setClasses] = useState([style.box, style.active])

  useEffect(() => {
    const [midY, midX] = getMidCoordinates(contentRef.current)
    setMid({
      top: midY,
      left: midX
    })
  }, [])

  const boxRef = React.createRef()
  const contentRef = React.createRef()

  const onMouseDown = (e) => {
    console.log('onMouseDown :', e.type)

    const target = boxRef.current
    const [midY, midX] = getMidCoordinates(contentRef.current)
    setMid({
      top: midY,
      left: midX
    })
    
    const shiftTop = e.clientY - target.getBoundingClientRect().top
    const shiftLeft = e.clientX - target.getBoundingClientRect().left
    setShift({
      top: shiftTop,
      left: shiftLeft
    })

    document.ondragover = function(e) {
      const borderLeft = 256 - mid.left
      console.log('borderLeft: ', borderLeft)

      target.style.top = `${e.clientY - mid.top - shiftTop}px`
      target.style.left = (-e.clientX + shiftLeft) > borderLeft 
      ? `${borderLeft}px` 
      : `${e.clientX - mid.left - shiftLeft}px`
      // target.style.left = `${e.clientX - mid.left - shiftLeft}px`
    }
  }

  const onDragEnd = e => {
    console.log('drag end')
    const target = boxRef.current
    setCoord({
      top: target.style.top,
      left: target.style.left
    })
    setShift({
      top: 0,
      left: 0
    })
  }

  window.c = coord

  const showState = e => {
    console.log('coord: ', coord)
    console.log('shift: ', shift)
    console.log('mid: ', mid)
  }

  return (
    <div
      className={style.content}
      id="content"
      ref={contentRef}
    >
      <div className={style.content_mid}>
        <div
          className={classes.join(' ')}
      draggable="true"
          ref={boxRef}
          style={{
            top: `${coord.top}px`,
            left: `${coord.left}px`
          }}

          onMouseDown={e => {
            onMouseDown(e)
          }}
          onDragEnd={e => {
            console.log('onDragEnd :', e.type)
            onDragEnd(e)
          }}
          // onDrag={e => {
          //   onDrag(e)
          // }}
          onClick={showState}

        >BOX</div>
      </div>
      <button
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0
        }}
        onClick={showState}
      >state</button>
    </div >
  )
}

export default ContentDnd