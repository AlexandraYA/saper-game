import { TLevels, TFieldKey } from "./types"


const settings: TLevels = {
  junior: {
    rows: 9,
    cols: 9,
    mines: 10
  },
  amateur: {
    rows: 16,
    cols: 16,
    mines: 40
  },
  profi: {
    rows: 16,
    cols: 30,
    mines: 99
  }
}

const defaultLevel: TFieldKey = "junior"

const mineIndicator = 9
const emptyIndicator = 0

export { settings, defaultLevel, mineIndicator, emptyIndicator }
