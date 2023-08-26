import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { actionCreators } from '../../../state'

import './dropdown.scss'

const Dropdown = forwardRef((params, ref) => {
  /* 
  This Dropdown Component will take a ref, that'll be to store the state of the dropdown, so that it can be accessed and changed from outside of this component.
  */

  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  
  useImperativeHandle(ref, () => ({
    show: show,
    setShow: (val) => setShow(val),
  }));

  const componentRef = useRef(null);

  const postId = useSelector((state) => state.post[params.id]._id);
  const postCreatorId = useSelector((state) => state.post[params.id].creator._id);
  const userId = useSelector((state) => state.auth.authData._id);

  const is_same = postCreatorId === userId;

  const handle = {
    delete: () => {actionCreators.post.deletePost(params.id, postId)(dispatch)},
    deleteComment: () => {actionCreators.post.deleteComment(params.id, params._id, params.parentId)(dispatch)},
  }

  // to position dropdown
  useEffect(() => {
    // Middle of the button
    // ref.current.style.transform = `translateX(-50%) translateX(${referenceWidth / 2}px)`; // 50% of the dropdown width and 50% of the button width

    // Left of the button
    if (componentRef.current) {
      const referenceWidth = params.btnRef.current.getBoundingClientRect().width; // width of the button
      componentRef.current.style.transform = `translateX(-100%) translateX(${referenceWidth}px)` // 50% of the dropdown width and 50% of the button width
    }

  })

  // to toggle dropdown when clicked outside of it (from Search.js, go there for more info)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((componentRef.current) && 
        (!componentRef.current.contains(event.target)) &&
        (event.target.closest(`#dropdown${params.id}`) === null)) {
        setShow(false)
        console.log('clicked outside');
      }
    };

    if (componentRef.current) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      if (componentRef.current) document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  if (!show) return (null); // Why isn't this return null is more above, to prevent unnessesary rendering, because we have to render all the hooks everytime, whether we use it or not, it's as react works, at it's core, if not then component will fall in re-render loop
  
  return (
    <div ref={componentRef} className='dropdown transition'>
      <ul>
        {/* <li className='transition'>{}</li> */}
        {is_same && <li className='transition' onClick={() => {
          if (params.type === 'post') handle.delete()
          else if (params.type === 'comment') {
            console.log('comment id', params._id);
            handle.deleteComment()}
        }
          }>Delete</li>} {/* Same like is_same? but it don't need a else (Why: Because it's the way and works first check if a condition is true then check or render another condition only) */}
        {!is_same && <li className='transition'>Report</li>}
      </ul>
    </div>
  )
})

export default Dropdown