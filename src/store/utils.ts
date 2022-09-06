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

  return rands
}


const prepareField = (settings: TSettings): Record<string, TCell[][] | number[][]> => {

  const mines = getRandCellArr(settings.mines, settings.rows*settings.cols-1)
  let field: TCell[][] = []
  let minesCoords: number[][] = []

  for (let x = 0; x < settings.rows; x++) {
    let row: TCell[] = []
    for (let y = 0; y < settings.cols; y++) {
      let coordsInd = settings.cols*x+y
      if (mines.includes(coordsInd)) {
        minesCoords.push([x,y])
      }

      row.push({
        mark: null,
        x,
        y, 
        indicator: mines.includes(coordsInd) ? 9 : 0,
        ifOpen: false
      })
    }
    field.push(row)
  }

  for (let x = 0; x < field.length; x++) {
    for (let y = 0; y < field[x].length; y++) {
      if (field[x][y].indicator === 9) {
        if (x > 0 && field[x-1][y].indicator !== 9) {
          field[x-1][y].indicator++
        }

        if (x > 0 && y < field[x].length - 1 && field[x-1][y+1].indicator !== 9) {
          field[x-1][y+1].indicator++
        }

        if (x > 0 && y > 0 && field[x-1][y-1].indicator !== 9) {
          field[x-1][y-1].indicator++
        }

        if (y < field[x].length - 1 && field[x][y+1].indicator !== 9) {
          field[x][y+1].indicator++
        }

        if (y > 0 && field[x][y-1].indicator !== 9) {
          field[x][y-1].indicator++
        }

        if (x < field.length - 1 && field[x+1][y].indicator !== 9) {
          field[x+1][y].indicator++
        }

        if (x < field.length - 1 && y < field[x].length - 1 && field[x+1][y+1].indicator !== 9) {
          field[x+1][y+1].indicator++
        }

        if (x < field.length - 1 && y > 0 && field[x+1][y-1].indicator !== 9) {
          field[x+1][y-1].indicator++
        }
      }
    }
  }

  return {field, minesCoords}
}

export { getRandCellArr, prepareField }