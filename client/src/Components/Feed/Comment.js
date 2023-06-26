import { React, useState} from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faComment, faArrowUpFromBracket as share } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../state/index'

import Id from './Id'

const Comments = (params) => {
  const dispatch = useDispatch();

  // let data = useSelector((state) => state.post[params.id].answers[params.index]);
  // console.log(data);
  let profile = JSON.parse(localStorage.getItem('profile'))

  let [showReplyInputBox, setShowReplyInputBox] = useState(false)
  let [reply, setReply] = useState('')

  let upComment = async () => {
    let temp = await actionCreators.comment.upComment(reply, params._id, profile._id, profile.source, params.post_id)
    dispatch(temp)
  }

  let showReplies = async (_id, child_ids, post_id) => {
    let temp = await actionCreators.comment.showComments(_id, child_ids, post_id)
    dispatch(temp)
  }
  
  let toggle = (value, setValue) => {
    if (value===false) {
      setValue(true)
    } else {
      setValue(false)
    }
  }

  let paddingLeft = (iter) => {
    const element = document.getElementsByClassName('comment-content')[0];
    const computedStyle = window.getComputedStyle(element);
    let propertyValue = computedStyle.getPropertyValue('padding-left');

    return parseFloat(propertyValue)*iter
  }
  

  // if (!data) {
  //   return (
  //     <div>Loding...</div>
  //   )
  // }

  return (
    <div className="comment-cont"
    style={(() => {
      if (params.iter===0) {
        return {}
      } else {
        return {paddingLeft: paddingLeft(params.iter)}
      }
    })()}>
      <Id _id={params.creator._id} source={params.creatorRefModel} full={false}/>

      <div className='comment-content'>
        <div className="comment">
          {params.comment}
        </div>

        <div className='interact-comment'>
          <div className='interact-comment-child upvote'>
            <left className='icon'>
              <FontAwesomeIcon icon={faArrowUp} />
            </left>
            <div>
              {params.like.count}
            </div>
          </div>
          <div className='interact-comment-child downvote'>
            <left className='icon'>
              <FontAwesomeIcon icon={faArrowDown} />
            </left>
            <div>
            {params.dislike.count}
            </div>
          </div>
          <div className='interact-comment-child comment-count'>
            <left className='icon'>
              <FontAwesomeIcon icon={faComment} />
            </left>
            <div>
              1.5k
            </div>
          </div>
          <div className='interact-comment-child share'>
            <left className='icon'>
              <FontAwesomeIcon icon={share} />
            </left>
            <div>
              0.5k
            </div>
          </div>
        </div>

        {params.childComments.length? (
          <button onClick={() => {showReplies(params._id, params.childComments, params.post_id)}}>
            Show Replies
          </button>
        ) : (<></>)}
        <button onClick={() => {toggle(showReplyInputBox, setShowReplyInputBox)}}>
          Replie
        </button>
        {showReplyInputBox? (
          <>
          <input onChange={(e) => {setReply(e.target.value)}}/>
          <button onClick={upComment}>Send</button>
          </>
        ) : (<></>)}
      </div>
    </div>
  )
}

export default Comments