import React from 'react'

import { useDispatch } from 'react-redux'

import { actionCreators } from '../../../state'

export default (params) => {
  const dispatch = useDispatch()

  const getClass = (isSelected) => {
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

  const getId = (parent, id) => {
    return `${parent}-${id}`
  }

  const handleClick = (name) => {
    actionCreators.changer.change(name)(dispatch)
  }

  return (
    
    <div
    id={getId(params.parent, params.id)}
    className={`${getClass(params.isSelected)} transition`}
    onClick={() => {
    handleClick(params.name)
    }}
    >
      {params.name}
    </div>
  )
}