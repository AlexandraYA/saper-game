import { TSettings, TCell } from "./types"
import { mineIndicator, emptyIndicator } from './data'


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

const setOpenFields = (touchedCell: TCell, field: TCell[][]): TCell[][] => {
  
  const maxX = field.length - 1
  const maxY = field[0].length - 1  
  
  let curCell: null | {x: number, y: number} = {
    x: touchedCell.x,
    y: touchedCell.y
  }
  
  while (!!curCell) {

    if (!field[curCell.x][curCell.y].ifOpen) {
      field[curCell.x][curCell.y].ifOpen = true
      let nextCell: null | {x: number, y: number} = null
       

      if (curCell.x+1 < maxX) {
        if (curCell.y-1 > 0) {
          if (field[curCell.x+1][curCell.y-1].indicator === emptyIndicator) {
            nextCell = {
              x: curCell.x + 1,
              y: curCell.y - 1
            }
          } else if (typeof field[curCell.x+1][curCell.y-1].indicator === "number") {
            field[curCell.x+1][curCell.y-1].ifOpen = true
          }
        }

        if (field[curCell.x+1][curCell.y].indicator === emptyIndicator) {
          if (!nextCell) {
            nextCell = {
              x: curCell.x + 1,
              y: curCell.y
            }
          }
        } else if (typeof field[curCell.x+1][curCell.y].indicator === "number") {
          field[curCell.x+1][curCell.y].ifOpen = true
        }

        if (curCell.y+1 < maxY) {
          if (field[curCell.x+1][curCell.y+1].indicator === emptyIndicator) {
            if (!nextCell) {
              nextCell = {
                x: curCell.x + 1,
                y: curCell.y + 1
              }
            }
          } else if (typeof field[curCell.x+1][curCell.y+1].indicator === "number") {
            field[curCell.x+1][curCell.y+1].ifOpen = true
          }
        }
      }

      if (curCell.y+1 < maxY) {
        if (field[curCell.x][curCell.y+1].indicator === emptyIndicator) {
          if (!nextCell) {
            nextCell = {
              x: curCell.x,
              y: curCell.y + 1
            }
          }
        } else if (typeof field[curCell.x][curCell.y+1].indicator === "number") {
          field[curCell.x][curCell.y+1].ifOpen = true
        }
      }

      if (curCell.x-1 > 0) {
        if (curCell.y+1 < maxY) {
          if (field[curCell.x-1][curCell.y+1].indicator === emptyIndicator) {
            if (!nextCell) {
              nextCell = {
                x: curCell.x - 1,
                y: curCell.y + 1
              }
            }
          } else if (typeof field[curCell.x-1][curCell.y+1].indicator === "number") {
            field[curCell.x-1][curCell.y+1].ifOpen = true
          }
        }

        if (field[curCell.x-1][curCell.y].indicator === emptyIndicator) {
          if (!nextCell) {
            nextCell = {
              x: curCell.x - 1,
              y: curCell.y
            }
          }
        } else if (typeof field[curCell.x-1][curCell.y].indicator === "number") {
          field[curCell.x-1][curCell.y].ifOpen = true
        }

        if (curCell.y-1 > 0) {
          if (field[curCell.x-1][curCell.y-1].indicator === emptyIndicator) {
            if (!nextCell) {
              nextCell = {
                x: curCell.x - 1,
                y: curCell.y - 1
              }
            }
          } else if (typeof field[curCell.x-1][curCell.y-1].indicator === "number") {
            field[curCell.x-1][curCell.y-1].ifOpen = true
          }
        }
      }

      if (curCell.y-1 > 0) {
        if (field[curCell.x][curCell.y-1].indicator === emptyIndicator) {
          if (!nextCell) {
            nextCell = {
              x: curCell.x,
              y: curCell.y - 1
            }
          }
        } else if (typeof field[curCell.x][curCell.y-1].indicator === "number") {
          field[curCell.x][curCell.y-1].ifOpen = true
        }
      }

      if (!!nextCell) {
        curCell = {...nextCell}
      } else curCell = null

    } else curCell = null
  }  

  return field
}

export { getRandCellArr, prepareField, setOpenFields }