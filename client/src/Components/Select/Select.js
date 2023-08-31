import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { actionCreators } from '../../state'

import './select.scss'

const Select = (params) => {
  const dispatch = useDispatch()

  const show = useSelector((state) => state.select.show)
  const options = useSelector((state) => state.select.options)
  const selectorId = useSelector((state) => state.select.selectorId)
  const selectedId = useSelector((state) => state.select.selectedId)

  const handleClick = (index) => {

    // performing updation of state
    actionCreators.select.changeSelected(index)(dispatch)
  
    // excution of option statement
    actionCreators.post.hide(index, selectorId, selectedId)

    // closing the select
    actionCreators.select.changeShow(false)(dispatch)
  }

  useEffect(() => {
    return () => {
      actionCreators.select.changeShow(false)(dispatch)
    }
  }, [])

  if (!show) return null

  return (
    <div id='select-cont' className='center-absolute shadow'>
      <div id='select-head'>
        <div className='small-box'>
          OPTIONS
        </div>
      </div>

      <div id='select-options' className='flex'>
        {options.map((i, index) => {
          return (
          <div className='select-children transition-fast'
          onClick={() => {handleClick(index)}}>
            <p>
            Option {index+1}: {i}
            </p>
          </div>
          )
        })}
      </div>

    </div>
  )
}

export default Select