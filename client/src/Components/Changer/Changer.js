import React from 'react'

import ChangerBlocks from './ChangerBlocks'

import './changer.css'

export default () => {
  let name="changer"

  let elements = [
    ["Feed", true],
    ["My Questions", false],
    ["Circle", false]
  ]

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