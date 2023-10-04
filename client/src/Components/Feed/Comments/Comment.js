import { React, useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faComment, faArrowUpFromBracket as faShare, faExpand, faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../../state/index'

import { toggle } from '../../../Utils/Basic'
import { DropdownOptionsReduced } from '../../../Utils/DropdownOptions'

import TextEditor from '../../TextEditor/SunEditor/TextEditor'

import Id from '../Id/Id'
import Dropdown from '../../Dropdown/Dropdown'
import IconAndCount from '../IconAndCount/IconAndCount'

const Comments = (params) => {
  const dispatch = useDispatch();

  // const dropdownOptionsAll = [delete=is_same, report,  Select=is_my_post && !is_same]
  
  const textContainerRef = useRef(null);
  const textContainerControlRef = useRef(null);

  const optionsBtnRef = useRef(null);
  const dropdownRef = useRef(null);

  const indent = useSelector((state) => state.indent);
  const profile = useSelector((state) => state.auth.authData);

  // for comment selection
  // console.log(params.postId);
  const post = useSelector((state) => state.post[params.post_id]);
  const is_same = params.creator._id === profile._id;
  const is_my_post = post.creator._id === profile._id;
  // ---------------------------------------------------

  const [inputData, setInputData] = useState('')
  const [showReplyInputBox, setShowReplyInputBox] = useState(false)

  const dropdownOptionsAll = [
    {
      optionName: 'Delete',
      optionCondition: {
        show: is_same,
      }
    },
    {
      optionName: 'Report',
      optionCondition: {
        show: !is_same,
      },
    },
    {
      optionName: 'Select',
      optionCondition: {
        show: !is_same && is_my_post,
      }
    },
  ]
  
  const handle = {
    upComment : async () => {
      let temp = await actionCreators.comment.upComment(inputData, params._id, profile._id, params.post_id)
      dispatch(temp)
    },
    showReplies : async (_id, child_ids, post_id) => {
      let temp = await actionCreators.comment.showComments(_id, child_ids, post_id)
      dispatch(temp)
    },
    increment : async (what) => {
      let temp = await actionCreators.comment.increment(what, params._id, profile._id, params.post_id)
      dispatch(temp)
    },

    dropdown: {
      onChange: (to) => {},

      onSelect: [
        // Delete
        () => {actionCreators.post.deleteComment(params.post_id, params._id, params.parentId)(dispatch)},

        // Report
        () => {},

        // Select
        async () => {
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
            actionCreators.post.close(params.post_id, post._id)(dispatch)
    
            // Ask for what to do with Post
            // Another Compoent Like Auth to select what to do with post 
            actionCreators.select.changeShow(true)(dispatch)
            actionCreators.select.changeOptions([
              'Don\'t Hide', // none
              'Hide whole post from everybody', // all
              'Hide only selected answer', // selected
              'Hide every answer except selected answer', // exceptSelected
              'Hide Every Answer', // private
            ])(dispatch)
            actionCreators.select.updateSelectorId(post._id)(dispatch)
            actionCreators.select.updateSelectedId(params._id)(dispatch)
    
            // console.log(selected);
    
            // How to do another function from here? Like transfer payment or actually handling options
    
          }
        },
      ]
    }
  }
  
  const paddingLeft = () => {
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

    return <Id _id={params.creator._id} createdAt={params.createdAt} full={full}/>
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
        <div className='is-selected-comment'>
          {params.selected? 'Selected' : null}
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

            <Dropdown ref={dropdownRef} options={DropdownOptionsReduced(dropdownOptionsAll, handle)} btnRef={optionsBtnRef} position={'left'} onChange={handle.dropdown.onChange} onSelect={handle.dropdown.onSelect} />
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