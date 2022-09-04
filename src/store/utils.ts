import { TSettings, TCell } from "./types"


const getRandCellArr = (amount: number, maxValue: number): number[] => {
  const rands: number[] = []
  
  for (let i = 0; i < amount; i++) {
    rands.push(Math.round(Math.random() * maxValue))
  }
  console.log("rands = ", rands)
  return rands
}


const prepareField = (settings: TSettings) => {

  const mines = getRandCellArr(settings.mines, settings.rows*settings.cols-1)
  let field: TCell[][] = []

  for (let x = 0; x < settings.rows; x++) {
    let row: TCell[] = []
    for (let y = 0; y < settings.cols; y++) {
      row.push({
        mark: null,
        indicator: mines.includes((x+1)*y) ? 9 : 0,
        ifOpen: false
      })
    }
    field.push(row)
  }

  console.log("field = ", field)

  return field
}

export { getRandCellArr, prepareField }