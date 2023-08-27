import { React, useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faComment, faArrowUpFromBracket as faShare, faExpand, faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../../state/index'

import { toggle } from '../../../Utils/Basic'

import TextEditor from '../../TextEditor/SunEditor/TextEditor'

import Id from '../Id/Id'
import Dropdown from '../Dropdown/Dropdown'
import IconAndCount from '../IconAndCount/IconAndCount'

const Comments = (params) => {
  const dispatch = useDispatch();

  const textContainerRef = useRef(null);
  const textContainerControlRef = useRef(null);

  const optionsBtnRef = useRef(null);
  const dropdownRef = useRef(null);

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
  
  const renderID = () => { // this func. wants to not show Full mode(Showing Following), when the comment is of user or any body user follow
    let full = true

    if ( (profile._id === params.creator._id) || profile.following.ids.includes(params.creator._id)) {
      full = false
    }

    return <Id _id={params.creator._id} source={params.creatorRefModel} createdAt={params.createdAt} full={full}/>
  }

  
  // if (!data) {
  //   return (
  //     <div>Loding...</div>
  //   )
  // }


  return (
    <div className="comment-cont"
    style={paddingLeft()}>
      {/* <Id _id={params.creator._id} source={params.creatorRefModel} full={false}/> */}

      <div className="feed-head flex">
        <div className="feed-head-id">
          {renderID()}
        </div>
        <div className='feed-head-options flex'>
          <div className='feed-head-options-child'>
            <div className="full-screen">
              <FontAwesomeIcon className='fa-icon' icon={faExpand} />
            </div>
          </div>
          <div id={`dropdown${params.id}`} style={{position:'relative'}} className='feed-head-options-child'>
            <div className="more box" onClick={() => {toggle(dropdownRef.current.show, dropdownRef.current.setShow)}}> {/* This dropdown is getting populating from within Dropdown Component, see Dropdown for more info. */}
              <FontAwesomeIcon ref={optionsBtnRef} className='fa-icon' icon={faEllipsis}/>
            </div>

            <Dropdown ref={dropdownRef} _id={params._id} id={params.post_id} creatorId={params.creator._id} parentId={params.parentId} btnRef={optionsBtnRef} type='comment'/>
          </div>
        </div>
      </div>

      <div className='comment-content'>
        <div className="comment" dangerouslySetInnerHTML={{ __html: params.comment }}></div>

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