import React from 'react'
import { observer } from 'mobx-react-lite'
import timerStore from '../../store/timer'


const Timer: React.FC = observer(() => {
  const { hours, minutes, seconds } = timerStore

  return (
    <span>
      {!!hours ? `${hours}`.padStart(2, "0") : ""}
      {!!hours ? ":" : ""}
      {!!minutes || !!hours ? `${minutes}`.padStart(2, "0") : ""}
      {!!minutes || !!hours ? ":" : ""}
      {`${seconds}`.padStart(2, "0")}
    </span>
  )
})

export { Timer }