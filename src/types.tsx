export type Title = 'triangle' | 'rectangle'

export type FigureType = {
  id: number
  type: Title
  color: string
  position: {
    top: string
    left: string
  }
}

export type GetActiveFigureType = {
  figure: FigureType
  index: number
}

export type FigurePropsType = {
  classes: Array<string>
  figure: FigureType
  index: number
  onMouseDown: (e: React.MouseEvent, figure: FigureType, index: number) => void
  onFigureClickHandler: (e: React.MouseEvent, figure: FigureType, index: number) => void
  onKeyDown: (e: React.KeyboardEvent, index: number) => void
}

