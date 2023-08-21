import React from 'react'

import { useSelector } from 'react-redux'

import ChangerBlocks from './ChangerBlocks'

import './changer.css'

export default () => {
  const name="changer"

  const elements = useSelector((state) => state.changer);

  return (
    <div id="changer-container">
      <div id={name}>
      {elements.map((e, i) => {
        return (
          <ChangerBlocks id={i} last={elements.length} name={e[0]} isSelected={e[1]} parent={name}/>
          )
        })}
      </div>
    </div>
  )
}