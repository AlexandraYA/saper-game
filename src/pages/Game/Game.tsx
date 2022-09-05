/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { settings, defaultLevel } from '../../store/data'
import { prepareField } from '../../store/utils'
import { TSettings, TFieldKey, TCell } from '../../store/types'
import { useGameStyles } from './Game.style'
import ClockIcon from '../../assets/img/clock.png'
import MineIcon from '../../assets/img/mine.png'


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


  return (
    <div>
      <div css={style.fieldHeader}>
        <div>
          <img src={MineIcon} alt="flag"/>
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
            <div key={ind+colInd} css={style.cell}></div>
          ))
        })}
      </div>
    </div>
  )
}

export { Game }