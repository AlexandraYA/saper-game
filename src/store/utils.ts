import { TSettings, TCell } from "./types"


const getRandCellArr = (amount: number, maxValue: number): number[] => {
  const rands: number[] = []
  
  for (let i = 0; i < amount; i++) {
    let newInd = Math.round(Math.random() * maxValue)

    while (rands.includes(newInd)) {
      newInd = Math.round(Math.random() * maxValue)
    }

    rands.push(newInd)
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
        indicator: mines.includes(settings.cols*x+y) ? 9 : 0,
        ifOpen: false
      })
    }
    field.push(row)
  }

  console.log("field = ", field)

  return field
}

export { getRandCellArr, prepareField }