/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { settings, defaultLevel, mineIndicator } from '../../store/data'
import { prepareField } from '../../store/utils'
import { TSettings, TFieldKey, TCell } from '../../store/types'
import { useGameStyles } from './Game.style'
import ClockIcon from '../../assets/img/clock.png'
import MineIcon from '../../assets/img/mine.png'
import FlagIcon from '../../assets/img/flag.png'

const MineImage = () => (
  <img src={MineIcon} alt="mine"/>
)


const Game: React.FC = () => {
  const { levelCode } = useParams()
  const [ field, setField ] = useState<TCell[][]>([])
  const [ curSettings, setCurSettings ] = useState<TSettings>()
  const [ minesCounter, setMinesCounter ] = useState<number>(0)
  const [ timer, setTimer ] = useState<number>(0)

  const style = useGameStyles(curSettings?.cols ? curSettings.cols : settings[defaultLevel].cols)

  useEffect(() => {

    let _curSettings: TSettings = !!levelCode
      ? settings[levelCode as TFieldKey] : settings[defaultLevel]

    setCurSettings(_curSettings)
    setMinesCounter(_curSettings?.mines)
    setField(prepareField(_curSettings))
  },[levelCode])


  const handleClick = (cell: TCell) => {
    const _field = [...field]
    _field[cell.x][cell.y].ifOpen = true
    setField(_field)
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
            <div key={ind+colInd} css={style.cell} onClick={() => handleClick(cell)}>
              {cell.indicator === 9 ? <MineImage /> : getCellInner(cell.indicator)}
            </div>
          ))
        })}
      </div>
    </div>
  )
}

export { Game }