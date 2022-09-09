import { makeAutoObservable } from 'mobx'
import { settings, defaultLevel, emptyIndicator, mineIndicator } from './data'
import { TCell, TSettings, TFieldKey } from './types'
import { prepareField, setOpenFields } from './utils'

class SaperStore {

  minesCounter: number = 0
  timer: number = 0
  gameOver: boolean = false
  openedCells: number = 0
  field: TCell[][] = []
  minesCoords: number[][] = []
  lvlSettings: TSettings = settings[defaultLevel]


  constructor() {
    makeAutoObservable(this)

    this.prepareGame = this.prepareGame.bind(this)
    this.checkCell = this.checkCell.bind(this)
  }

  prepareGame(levelCode: string = defaultLevel) {
    this.lvlSettings = settings[levelCode as TFieldKey]
    this.minesCounter = this.lvlSettings.mines
    let result = prepareField(this.lvlSettings)
    this.field = result.field as TCell[][]
    this.minesCoords = result.minesCoords as number[][]
    this.gameOver = false
    this.openedCells = 0
  }

  checkCell(cell: TCell) {
    if (this.field[cell.x][cell.y].indicator === mineIndicator) {
      for (let i = 0; i < this.minesCoords.length; i++) {
        this.field[this.minesCoords[i][0]][this.minesCoords[i][1]].ifOpen = true
      }
      this.gameOver = true

    } else if (this.field[cell.x][cell.y].indicator === emptyIndicator) {
      this.openedCells += setOpenFields(cell, this.field)
    } else {
      this.field[cell.x][cell.y].ifOpen = true
      this.openedCells++
    }

    if (this.ifUserWin) {
      this.gameOver = true
    }
  }

  get ifUserWin() {
    return this.lvlSettings.rows * this.lvlSettings.cols - this.lvlSettings.mines === this.openedCells
  }
}

const saperStore = new SaperStore()
export default saperStore