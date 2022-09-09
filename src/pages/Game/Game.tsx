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

const MineImage = () => (
  <img src={MineIcon} alt="mine"/>
)


const Game: React.FC = observer(() => {
  const { levelCode } = useParams()
  const { prepareGame, lvlSettings, gameOver,
    field, minesCounter, timer, checkCell  } = saperStore
  
  const style = useGameStyles(lvlSettings.cols)

  useEffect(() => {
    if (!!levelCode) {
      prepareGame(levelCode)
    }    
  },[levelCode])

  const handleClick = (cell: TCell) => {
    if (gameOver) return

    checkCell(cell)
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
          <img src={FlagIcon} alt="flag"/>
          <span>{minesCounter}</span>
        </div>
        <div>
          <span>{timer}</span>
          <img src={ClockIcon} alt="timer"/>
        </div>
      </div>
      <div css={style.field}>
        {field.map((row: TCell[], ind: number) => {
          return row.map((cell: TCell, colInd: number) => (
            <div key={ind+colInd} css={[style.cell, cell.ifOpen ? style.cellOpen : ""]} onClick={() => handleClick(cell)}>
              {cell.indicator === 9 ? <MineImage /> : getCellInner(cell.indicator)}
            </div>
          ))
        })}
      </div>
    </div>
  )
})

export { Game }