import { React, useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faComment, faArrowUpFromBracket as faShare } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../../state/index'

import TextEditor from '../../TextEditor/TextEditor'

import Id from '../Id'
import IconAndCount from '../IconAndCount'

const Comments = (params) => {
  const dispatch = useDispatch();

  const textContainerRef = useRef(null);
  const textContainerControlRef = useRef(null);

  let indent = useSelector((state) => state.indent);
  let profile = useSelector((state) => state.auth.authData);

  let [inputData, setInputData] = useState('')
  let [showReplyInputBox, setShowReplyInputBox] = useState(false)
  
  let handle = {
    upComment : async () => {
      let temp = await actionCreators.comment.upComment(inputData, params._id, profile._id, profile.source, params.post_id)
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
          className='interact-comment-child box upvote'>
            <IconAndCount icon={faArrowUp} count={params.like.count} />
          </div>
          <div
          onClick={() => {handle.increment('dislike')}} 
          className='interact-comment-child box downvote'>
            <IconAndCount icon={faArrowDown} count={params.dislike.count} />
          </div>
          <div
          onClick={() => {handle.showReplies(params._id, params.childComments, params.post_id)}}
          className='interact-comment-child box comment-count'>
            <IconAndCount icon={faComment} count={params.childComments.length} text={'Comment'} if0Text={'Not Commented'} />
          </div>
          <div
          onClick={() => {handle.increment('share')}} 
          className='interact-comment-child box share'>
            <IconAndCount icon={faShare} count={params.share.count} text={'Share'} />
          </div>
        </div>

        {/* {params.childComments.length? (
          <button onClick={() => {handle.showReplies(params._id, params.childComments, params.post_id)}}>
            Show Replies
          </button>
        ) : (<></>)} */}
        <div className='btn transition' onClick={() => {toggle(showReplyInputBox, setShowReplyInputBox)}}>
          Reply
        </div>

        {showReplyInputBox? (
          <div ref={textContainerRef} className='text-and-btn-wrapper' style={{marginRight:'10px'}}>
            <TextEditor
            ref={textContainerControlRef}
            parentRef={textContainerRef}

            placeholder={"Comment..."}
            change={(data) => {setInputData(data)}}
            />
            
            <div
            onClick={() => {
              handle.upComment()
              textContainerControlRef.current.setContents('');
              textContainerControlRef.current.offToolbar();
            }}
            className='feed-more'>
              <p>SEND</p>
            </div>
          </div>
        ) : (<></>)}
      </div>
    </div>
  )
}

export default Comments