/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { TCell } from '../../store/types'
import saperStore from '../../store/store'
import { useGameStyles } from './Game.style'
import ClockIcon from '../../assets/img/clock.png'
import MineIcon from '../../assets/img/mine.png'
import FlagIcon from '../../assets/img/flag.png'
import { MARKS } from '../../store/data'
import { Timer } from '../../components/Timer/Timer'


const MineImage = () => (
  <img src={MineIcon} alt="mine"/>
)

const FlagImage = () => (
  <img src={FlagIcon} alt="maybe mine"/>
)


const Game: React.FC = observer(() => {
  const { levelCode } = useParams()
  const { prepareGame, lvlSettings, gameOver, increaseFlags, decreaseFlags,
    field, minesCounter, checkCell, ifUserWin } = saperStore
  
  const style = useGameStyles(lvlSettings.cols)

  useEffect(() => {
    prepareGame(levelCode)
  },[levelCode])

  const handleClick = (cell: TCell) => {
    if (gameOver || cell.mark === MARKS.FLAG) return

    checkCell(cell)
  }

  const handleRightClick = (e: any, cell: TCell) => {
    e.preventDefault()
    
    if (!cell.ifOpen) {
      switch (cell.mark) {
        case MARKS.FLAG:
          field[cell.x][cell.y].mark = MARKS.QUEST
          increaseFlags()
          break
        case MARKS.QUEST:
          field[cell.x][cell.y].mark = null
          break
        default:
          if (minesCounter > 0) {
            field[cell.x][cell.y].mark = MARKS.FLAG
            decreaseFlags()
          }
      }
    }
  }

  const getCellInner = (indicator: number): number | string => {
    switch (indicator) {
      case 0:
        return ""
      default:
        return indicator
    }
  }

  return (
    <div>
      <div css={style.fieldHeader}>
        <div>
          <FlagImage />
          <span>{minesCounter}</span>
        </div>
        {!!gameOver && <div>
          <button
            css={style.btnRestart}
            className={ifUserWin ? "win": "fail"}
            onClick={() => prepareGame(levelCode)}
          />
        </div>}
        <div>
          <Timer />
          <img src={ClockIcon} alt="timer"/>
        </div>
      </div>
      <div css={style.field}>
        {field.map((row: TCell[], ind: number) => {
          return row.map((cell: TCell, colInd: number) => (
            <div
              key={ind+colInd}
              css={[style.cell, cell.ifOpen ? "" : style.cellClose]}
              onClick={(e) => handleClick(cell)}
              onContextMenu={(e) => handleRightClick(e, cell)}
              data-testid="game-cell"
            >
              {cell.ifOpen && cell.indicator === 9 && <MineImage />}
              {cell.ifOpen && cell.indicator !== 9 && getCellInner(cell.indicator)}
              {!cell.ifOpen && cell.mark === MARKS.FLAG && <FlagImage />}
              {!cell.ifOpen && cell.mark === MARKS.QUEST && MARKS.QUEST}
            </div>
          ))
        })}
      </div>
    </div>
  )
})

export { Game }