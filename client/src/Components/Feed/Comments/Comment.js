import { React, useState} from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faComment, faArrowUpFromBracket as share } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../../state/index'

import Id from '../Id'

const Comments = (params) => {
  const dispatch = useDispatch();

  let indent = useSelector((state) => state.indent);
  let profile = useSelector((state) => state.auth.authData);

  let [reply, setReply] = useState('')
  let [showReplyInputBox, setShowReplyInputBox] = useState(false)
  
  let handle = {
    upComment : async () => {
      let temp = await actionCreators.comment.upComment(reply, params._id, profile._id, profile.source, params.post_id)
      dispatch(temp)
    },
    showReplies : async (_id, child_ids, post_id) => {
      let temp = await actionCreators.comment.showComments(_id, child_ids, post_id)
      dispatch(temp)
    },
    increment : async (what) => {
      let temp = await actionCreators.comment.increment(what, params._id, profile._id, profile.source, params.post_id)
      dispatch(temp)
    },
  }
  
  let paddingLeft = () => {
    if (params.iter===0) {
      return {}
    }
    else if (indent) {
      return {paddingLeft: parseFloat(indent)*(params.iter)}
    } else {
      const element = document.getElementsByClassName('comment-content')[0];
      const computedStyle = window.getComputedStyle(element);
      let propertyValue = computedStyle.getPropertyValue('padding-left');

      dispatch(actionCreators.comment.indent(propertyValue))
      return {}
    }
  }
  
  let toggle = (value, setValue) => {
    if (value===false) {
      setValue(true)
    } else {
      setValue(false)
    }
  }
  
  
  // if (!data) {
  //   return (
  //     <div>Loding...</div>
  //   )
  // }

  return (
    <div className="comment-cont"
    style={paddingLeft()}>
      <Id _id={params.creator._id} source={params.creatorRefModel} full={false}/>

      <div className='comment-content'>
        <div className="comment">
          {params.comment}
        </div>

        <div className='interact-comment'>
          <div
          onClick={() => {handle.increment('like')}}
          className='interact-comment-child upvote'>
            <left className='icon'>
              <FontAwesomeIcon icon={faArrowUp} />
            </left>
            <div>
              {params.like.count}
            </div>
          </div>
          <div
          onClick={() => {handle.increment('dislike')}} 
          className='interact-comment-child downvote'>
            <left className='icon'>
              <FontAwesomeIcon icon={faArrowDown} />
            </left>
            <div>
              {params.dislike.count}
            </div>
          </div>
          <div
          onClick={() => {handle.showReplies(params._id, params.childComments, params.post_id)}}
          className='interact-comment-child comment-count'>
            <left className='icon'>
              <FontAwesomeIcon icon={faComment} />
            </left>
            <div>
              {params.childComments.length}
            </div>
          </div>
          <div
          onClick={() => {handle.increment('share')}} 
          className='interact-comment-child share'>
            <left className='icon'>
              <FontAwesomeIcon icon={share} />
            </left>
            <div>
              {params.share.count}
            </div>
          </div>
        </div>

        {/* {params.childComments.length? (
          <button onClick={() => {handle.showReplies(params._id, params.childComments, params.post_id)}}>
            Show Replies
          </button>
        ) : (<></>)} */}
        <button onClick={() => {toggle(showReplyInputBox, setShowReplyInputBox)}}>
          Replie
        </button>
        {showReplyInputBox? (
          <>
          <input onChange={(e) => {setReply(e.target.value)}}/>
          <button onClick={handle.upComment}>Send</button>
          </>
        ) : (<></>)}
      </div>
    </div>
  )
}

export default Comments