import style from './Style.module.css'

const Style = props => {
  const disableButton = props.activeFigure.id === 0 ? true : false
  const background = props.activeFigure.color || '#fff'

  return (
    <>
      <span className={style.property}>Fill</span>
      <button
        disabled={disableButton}
        className={style.fill}
        title="open pallet"
        // style={{ backgroundColor: props.activeFigure.color }}
        style={{ backgroundColor: background }}
        onClick={props.colorPickerOpen}
      ></button>
    </>
  )
}

export default Style