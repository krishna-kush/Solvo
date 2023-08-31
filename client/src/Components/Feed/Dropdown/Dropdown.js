import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { actionCreators } from '../../../state'

import './dropdown.scss'

const Dropdown = forwardRef((params, ref) => {
  /* 
  This Dropdown Component will take a ref, that'll be to store the state of the dropdown, so that it can be accessed and changed from outside of this component.

  Other Attributes:
  _id: real id,
  id: numerical id of post,
  creatorId: id of the creator,
  parentId: id of the parent of the comment (if it's a comment),
  btnRef: ref of the button that'll be clicked to open the dropdown
  type: post or comment,

  Rules:
  if _id, then: it's real id,
  if var_id, then: it's numerical id,
  if varId, then: it's real id,
  */

  const dispatch = useDispatch()

  const [show, setShow] = useState(false)
  
  useImperativeHandle(ref, () => ({
    show: show,
    setShow: (val) => setShow(val),
  }));

  const componentRef = useRef(null);

  const userId = useSelector((state) => state.auth.authData._id);
  const postId = useSelector((state) => state.post[params.id]._id);
  const postCreatorId = useSelector((state) => state.post[params.id].creator._id);

  const selected = useSelector((state) => state.select.selected)
  console.log(selected);

  // IDENTIFIERS
  const is_comment = params.type === 'comment';
  const is_same = params.creatorId === userId;
  const is_my_post = postCreatorId === userId;

  const handle = {
    delete: () => {actionCreators.post.deletePost(params.id, params._id)(dispatch)},
    deleteComment: () => {actionCreators.post.deleteComment(params.id, params._id, params.parentId)(dispatch)},

    select: async () => {
      const userConfirmed = window.confirm("Do you want to perform this action?");

      if (userConfirmed) {
        /*
        Transfer Money if there
        Change state from open to Close

        Ask for what to do with Post {
          Hide whole post from everybody,
          Hide only selected answer,
          Hide every answer except selected answer,
          Hide Every Answer,
        }
        */

        // Money Transfer {}

        // Change state from open to Close
        actionCreators.post.close(params.id, postId)(dispatch)

        // Ask for what to do with Post
        // Another Compoent Like Auth to select what to do with post 
        actionCreators.select.changeShow(true)(dispatch)
        actionCreators.select.changeOptions([
          'Don\'t Hide',
          'Hide whole post from everybody',
          'Hide only selected answer',
          'Hide every answer except selected answer',
          'Hide Every Answer',
        ])(dispatch)
        actionCreators.select.updateSelectorId(postId)(dispatch)
        actionCreators.select.updateSelectedId(params._id)(dispatch)

        // console.log(selected);

        // How to do another function from here? Like transfer payment or actually handling options

      }
    },
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
        {is_same && (!is_comment || is_same) && <li className='transition' onClick={() => {
          if (params.type === 'post') handle.delete()
          else if (params.type === 'comment') {
            handle.deleteComment()}
        }
          }>Delete</li>} {/* Same like is_same? but it don't need a else (Why: Because it's the way and works first check if a condition is true then check or render another condition only) */}
        {!is_same && <li className='transition'>Report</li>}

        {/* For Comments */}
        {is_my_post && !is_same && <li className='transition'
        onClick={handle.select}>Select</li>}
        {/* For Comments */}
      </ul>
    </div>
  )
})

export default Dropdown