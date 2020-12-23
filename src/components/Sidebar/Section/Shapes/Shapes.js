import style from './Shapes.module.css'

const Shapes = props => {
  return (
    <>
      <div
        className={style.createButton + ' ' + style.rectangle}
        title="create rectangle"
        onClick={() => props.createFigureHandler('rect')}
      ></div>
      <div
        className={style.createButton + ' ' + style.triangle}
        title="create triangle"
        onClick={() => props.createFigureHandler('tri')}
      ></div>
    </>
  )
}

export default Shapes