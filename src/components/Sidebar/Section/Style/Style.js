import style from './Style.module.css'

const Style = props => {
  const disableButton = props.activeFigure === null ? true : false
  const backgroundColor = props.activeFigure === null ? '#fff' : props.activeFigure.color
  // const backgroundColor = props.activeFigure === null ? 'darkorange' : props.activeFigure.color


  return (
    <>
      <span className={style.property}>Fill</span>
      <button
        disabled={disableButton}
        className={style.fill}
        title="open pallet"
        style={{ backgroundColor: backgroundColor }}
        onClick={props.colorPickerOpen}
      ></button>
    </>
  )
}

export default Style