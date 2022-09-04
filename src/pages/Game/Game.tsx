import React from 'react'
import { useParams } from 'react-router-dom'
import { settings } from '../../store/data'


const Game: React.FC = () => {
  let { levelCode } = useParams()

  

  return (
    <div>
      {levelCode}
    </div>
  )
}

export { Game }