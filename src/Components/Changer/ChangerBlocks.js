import React from 'react'

const ChangerBlocks = (params) => {
  let getClass = (isSelected) => {
    if (isSelected==true) {
      return `changer-block selected`
    }
    return `changer-block`
  }

  return (
    <div className={getClass(params.isSelected)} >
      {params.name}
    </div>
  )
}

export default ChangerBlocks