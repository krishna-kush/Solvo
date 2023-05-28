import React from 'react'

export default (params) => {

  let getClass = (isSelected) => {
    if (isSelected==true) {
      if (params.id==0) {
        return `changer-block left-m selected`
      } else if (params.id==params.last-1) {
        return `changer-block right-m selected`
      } else {
        return `changer-block middle-m selected`
      }
    } else {
      if (params.id==0) {
        return `changer-block left-m`
      } else if (params.id==params.last-1) {
        return `changer-block right-m`
      } else {
        return `changer-block middle-m`
      }
    }
  }

  let getId = (parent, id) => {
    return `${parent}-${id}`
  }

  const handleClick = (id) => {
    let removeClass = (last) => {
      for (let i=0; i<last; i++) {
        document.getElementById(getId(params.parent, i)).classList.remove("selected")
      }
    }
    removeClass(params.last)

    document.getElementById(id).classList.add("selected")
  }

  return (
    
    <div
    id={getId(params.parent, params.id)}
    className={getClass(params.isSelected)}
    onClick={() => {
    handleClick(getId(params.parent, params.id))
    }}
    >
      {/* {params.name} */}
      {params.id}
    </div>
  )
}