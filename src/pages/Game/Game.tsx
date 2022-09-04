/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { settings, defaultLevel } from '../../store/data'
import { prepareField } from '../../store/utils'
import { TSettings, TFieldKey, TCell } from '../../store/types'
import { useGameStyles } from './Game.style'


const Game: React.FC = () => {
  const { levelCode } = useParams()
  const [ field, setField ] = useState<TCell[][]>([])
  const [ curSettings, setCurSettings ] = useState<TSettings>()

  const style = useGameStyles(curSettings?.cols ? curSettings.cols : settings[defaultLevel].cols)

  useEffect(() => {

    let _curSettings: TSettings = !!levelCode
      ? settings[levelCode as TFieldKey] : settings[defaultLevel]

    setCurSettings(_curSettings)
    setField(prepareField(_curSettings))
  },[levelCode])


  return (
    <div>
      <div>Бомб {curSettings?.mines}</div>
      <div css={style.field}>
        {field.map((row: TCell[], ind: number) => {
          return row.map((cell: TCell, colInd: number) => (
            <div key={ind+colInd} css={style.cell}>{cell.indicator}</div>
          ))
        })}
      </div>
    </div>
  )
}

export { Game }