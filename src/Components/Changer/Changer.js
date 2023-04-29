import React from 'react'

import ChangerBlocks from './ChangerBlocks'

const Changer = () => {
  let elements = ["Feed", "My Questions", "Circle"]

  return (
    <div id="changer-container">
      <div id="changer">
      {elements.map((e, i) => {
        return (
          <ChangerBlocks id={i} ele={e}/>
          )
        })}
      </div>
    </div>
  )
}

export default Changer