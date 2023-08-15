import React, { useState, useEffect, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { actionCreators } from '../../../state'

import './dropdown.scss'

const Dropdown = (params) => {

  const dispatch = useDispatch()

  const ref = useRef(null);

  const postId = useSelector((state) => state.post[params.post_id]._id);
  const postCreatorId = useSelector((state) => state.post[params.post_id].creator._id);
  const userId = useSelector((state) => state.auth.authData._id);

  const is_same = postCreatorId === userId;

  const handle = {
    delete: () => {actionCreators.post.deletePost(params.post_id, postId)(dispatch)}
  }

  const getClass = () => {
    if (params.show) {
      return 'dropdown transition'
    } else {
      return 'dropdown transition mouse-none'
    }
  }

  useEffect(() => {
    const referenceWidth = params.btnRef.current.getBoundingClientRect().width; // width of the button

    // Middle of the button
    // ref.current.style.transform = `translateX(-50%) translateX(${referenceWidth / 2}px)`; // 50% of the dropdown width and 50% of the button width

    // Left of the button
    ref.current.style.transform = `translateX(-100%) translateX(${referenceWidth}px)`; // 50% of the dropdown width and 50% of the button width
  }, [])
  
  return (
    <div ref={ref} className={getClass()}>
      <ul>
        {/* <li className='transition'>{}</li> */}
        {is_same && <li className='transition' onClick={handle.delete}>Delete</li>} {/* Same like is_same? but it don't need a else (Why: Because it's the way and works first check if a condition is true then check or render another condition only) */}
        {!is_same && <li className='transition'>Report</li>}
      </ul>
    </div>
  )
}

export default Dropdown