import style from './Style.module.css'

const Style = props => {
  return (
    <>
      <span className={style.property}>Fill</span>
      <button
        className={style.fill}
        title="open pallet"
      ></button>
    </>
  )
}

export default Style