import style from './Shapes.module.css'

const Shapes = props => {
  return (
    <>
      <div
        className={style.createButton + ' ' + style.rectangle}
        title="create rectangle"
      ></div>
      <div
        className={style.createButton + ' ' + style.triangle}
        title="create triangle"
      ></div>
    </>
  )
}

export default Shapes