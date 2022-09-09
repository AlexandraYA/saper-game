import { TSettings, TCell } from "./types"
import { mineIndicator, emptyIndicator, MARKS } from './data'


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


  let x = minesCoords[0][0]
  let y = minesCoords[0][1]

  for (let i = 0; i < settings.mines; i++) {

    x = minesCoords[i][0]
    y = minesCoords[i][1]

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

  return {field, minesCoords}
}


const ifNotMineOrEmpty = (cell: TCell): boolean => {
  return cell.indicator > emptyIndicator && cell.indicator < mineIndicator && !cell.ifOpen
}

const setOpenFields = (touchedCell: TCell, field: TCell[][]): Record<string, number> => {
  
  const maxX = field.length
  const maxY = field[0].length
  let openedCells = 0
  let flags = 0

  const changeCellSettings = (x: number, y: number) => {
    field[x][y].ifOpen = true
    openedCells++

    if (field[x][y].mark === MARKS.FLAG) {
      field[x][y].mark = null
      flags++
    }
  }

  const queue: {x: number, y: number}[] = [{
    x: touchedCell.x,
    y: touchedCell.y
  }]
  
  let curCell: null | {x: number, y: number} | undefined = null
  
  while (!!queue.length) {

    curCell = queue.shift()

    if (!!curCell) {

      if (!field[curCell.x][curCell.y].ifOpen) {
        changeCellSettings(curCell.x, curCell.y)
      }

      if (curCell.x+1 < maxX) {
        if (curCell.y-1 > -1) {
          if (ifNotMineOrEmpty(field[curCell.x+1][curCell.y-1])) {
            changeCellSettings(curCell.x+1, curCell.y-1)
          }
        }

        if (field[curCell.x+1][curCell.y].indicator === emptyIndicator
            && !field[curCell.x+1][curCell.y].ifOpen) {

          queue.push({x: curCell.x + 1, y: curCell.y}) 

        } else if (ifNotMineOrEmpty(field[curCell.x+1][curCell.y])) {
          changeCellSettings(curCell.x+1, curCell.y)
        }

        if (curCell.y+1 < maxY) {
          if (ifNotMineOrEmpty(field[curCell.x+1][curCell.y+1])) {
            changeCellSettings(curCell.x+1, curCell.y+1)
          }
        }
      }

      if (curCell.y+1 < maxY) {
        if (field[curCell.x][curCell.y+1].indicator === emptyIndicator
            && !field[curCell.x][curCell.y+1].ifOpen) {

          queue.push({x: curCell.x, y: curCell.y + 1})

        } else if (ifNotMineOrEmpty(field[curCell.x][curCell.y+1])) {
          changeCellSettings(curCell.x, curCell.y+1)
        }
      }

      if (curCell.x-1 > -1) {
        if (curCell.y+1 < maxY) {
          if (ifNotMineOrEmpty(field[curCell.x-1][curCell.y+1])) {
            changeCellSettings(curCell.x-1, curCell.y+1)
          }
        }
        
        if (field[curCell.x-1][curCell.y].indicator === emptyIndicator
            && !field[curCell.x-1][curCell.y].ifOpen) {
              
          queue.push({x: curCell.x-1, y: curCell.y})

        } else if (ifNotMineOrEmpty(field[curCell.x-1][curCell.y])) {
          changeCellSettings(curCell.x-1, curCell.y)
        }

        if (curCell.y-1 > -1) {
          if (ifNotMineOrEmpty(field[curCell.x-1][curCell.y-1])) {
            changeCellSettings(curCell.x-1, curCell.y-1)
          }
        }
      }

      if (curCell.y-1 > -1) {
        if (field[curCell.x][curCell.y-1].indicator === emptyIndicator
            && !field[curCell.x][curCell.y-1].ifOpen) {

          queue.push({x: curCell.x, y: curCell.y-1})

        } else if (ifNotMineOrEmpty(field[curCell.x][curCell.y-1])) {
          changeCellSettings(curCell.x, curCell.y-1)
        }
      }
    }
  } 

  return {openedCells, flags}
}

export { getRandCellArr, prepareField, setOpenFields }