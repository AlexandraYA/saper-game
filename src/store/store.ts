import { makeAutoObservable } from 'mobx'
import { settings, defaultLevel, emptyIndicator, mineIndicator } from './data'
import { TCell, TSettings, TFieldKey } from './types'
import { prepareField, setOpenFields } from './utils'
import timerStore from './timer'


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
    this.increaseFlags = this.increaseFlags.bind(this)
    this.decreaseFlags = this.decreaseFlags.bind(this)
  }

  prepareGame(levelCode: string = defaultLevel) {
    this.lvlSettings = settings[levelCode as TFieldKey]
    this.minesCounter = this.lvlSettings.mines
    let result = prepareField(this.lvlSettings)
    this.field = result.field as TCell[][]
    this.minesCoords = result.minesCoords as number[][]
    this.gameOver = false
    this.openedCells = 0
    timerStore.startTimer()
  }

  checkCell(cell: TCell) {
    if (this.field[cell.x][cell.y].indicator === mineIndicator) {
      for (let i = 0; i < this.minesCoords.length; i++) {
        this.field[this.minesCoords[i][0]][this.minesCoords[i][1]].ifOpen = true
      }
      this.gameOver = true
      timerStore.stopTimer()

    } else if (this.field[cell.x][cell.y].indicator === emptyIndicator) {
      const newData = setOpenFields(cell, this.field)
      this.openedCells += newData.openedCells
      this.minesCounter += newData.flags
    } else {
      this.field[cell.x][cell.y].ifOpen = true
      this.openedCells++
    }

    if (this.ifUserWin) {
      this.gameOver = true
      timerStore.stopTimer()
    }
  }

  increaseFlags() {
    if (this.minesCounter < this.lvlSettings.mines - 1)
      this.minesCounter++
  }

  decreaseFlags() {
    if (this.minesCounter > 0)
      this.minesCounter--
  }

  get ifUserWin() {
    return this.lvlSettings.rows * this.lvlSettings.cols - this.lvlSettings.mines === this.openedCells
  }
}

const saperStore = new SaperStore()
export default saperStore