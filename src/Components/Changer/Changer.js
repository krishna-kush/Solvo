import React from 'react'

import ChangerBlocks from './ChangerBlocks'

const Changer = () => {
  let elements = [
    ["Feed", true],
    ["My Questions", false],
    ["Circle", false]
  ]

  return (
    <div id="changer-container">
      <div id="changer">
      {elements.map((e, i) => {
        return (
          <ChangerBlocks id={i} name={e[0]} isSelected={e[1]}/>
          )
        })}
      </div>
    </div>
  )
}

export default Changer