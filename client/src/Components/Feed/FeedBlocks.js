import React, { useEffect, useState, useRef } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faArrowUpFromBracket as faShare, faExpand, faEllipsis } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../state'

import TextEditor from '../TextEditor/SunEditor/TextEditor'

import Id from './Id/Id'
import Comments from './Comments/Comments'
import Dropdown from './Dropdown/Dropdown'
import IconAndCount from './IconAndCount/IconAndCount'


export default React.memo((params) => { // React's memo is a Higher-Order Component (HOC) that is used to preventing unnecessary re-renders when params don't change
  const dispatch = useDispatch();

  const textContainerRef = useRef(null);
  const textContainerControlRef = useRef(null);

  // useEffect(() => {
  //   const a = document.getElementsByClassName(`dot-inner`)[0].style.height 
  //   console.log(a);
  // }, [])

  
  const data = useSelector((state) => state.post[params.id]);
  const profile = useSelector((state) => state.auth.authData);
  // console.log(data, profile);
  
  const optionsBtnRef = useRef(null);

  const [inputData, setInputData] = useState('')
  const [showComments, setShowComments] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  
  const upAnswer = async (firstToAns) => {
    const temp = await actionCreators.post.upAnswer(inputData, data._id, profile._id, profile.source, params.id)
    dispatch(temp)

    if (firstToAns) {setShowComments(true)}
  }

  const toggle = (value, setValue) => {
    if (value===false) {
      setValue(true)
    } else {
      setValue(false)
    }
  }

  const setClass = (if_last) => {
    if (if_last) {
      return "feed-block last-feed"
    } else {
      return "feed-block"
    }
  }

  const firstToAns = () => {
    if (data?.answers.length) return `Write your answer...`
    return `Be the first to answer...`
  }

  if (!data)  {
    return (
      <div >Loading...</div>
    )
  } 

  return (
    <div
    // id={`${data.id}`}
    className={data?.last?setClass(1):setClass(0)}>
      <div className="feed-head flex">
        <div className="feed-head-id">
          <Id _id={data.creator._id} source={data.creatorRefModel} full={true}/>
        </div>
        <div className='feed-head-options flex'>
          <div className='feed-head-options-child'>
            <div className="full-screen">
              <FontAwesomeIcon className='fa-icon' icon={faExpand} />
            </div>
          </div>
          <div style={{position:'relative'}} className='feed-head-options-child'>
            <div className="more box" onClick={() => {toggle(showDropdown, setShowDropdown)}}>
              <FontAwesomeIcon ref={optionsBtnRef} className='fa-icon' icon={faEllipsis}/>
            </div>

            {showDropdown?<Dropdown post_id={params.id} show={showDropdown} btnRef={optionsBtnRef}/>:null}
          </div>
        </div>
      </div>

      <div className="question-bar">
        <div className="question-bar-top">
          <div className="question" dangerouslySetInnerHTML={{ __html: data.question }}></div>
          
          <div className="question-details">
            <div className="small-box question-details-child">
              {data.amount?`₹${data.amount}`:"Free"}
            </div>
            <div className="small-box question-details-child">
              Closed/Open
            </div>
          </div>

        </div>
      </div>


      <div className="interact-answers-cont">
        <hr className='interact-answers-hr'/>

        <div className="interact-answers">
          <div className='interact-answers-child box'
          onClick={() => {toggle(showComments, setShowComments)}}
          >
            <IconAndCount icon={faComment} count={data.answers.length} text={'Answer'} if0Text={'Not Answered'} />
          </div>

          <div className='interact-answers-child box'>
            <IconAndCount icon={faShare} count={0} text={'Share'} />
          </div>
        </div>

        <hr className='interact-answers-hr'/>
      </div>

      {(showComments && data.answers.length)? (
        <div className="answers">
          <div className="answer">
            {/* {data.ans.map((ans, index) => { */}
              <Comments id={params.id}/>
            {/* }} */}
          </div>
        </div>

      ) : (<></>)}

      {(!data.answers.length || showComments) ? (
        <div ref={textContainerRef} className='text-and-btn-wrapper'>
          <TextEditor
          ref={textContainerControlRef}
          parentRef={textContainerRef}

          placeholder={firstToAns()}
          change={(data) => {setInputData(data)}}
          />

          <div
          onClick={() => {
            upAnswer(data?.answers.length?false:true)
            textContainerControlRef.current.setContents('');
            textContainerControlRef.current.offToolbar();
          }}
          className='feed-more'>
            <p>POST</p>
          </div>
        </div>
        ) : (<></>)}
      
    </div>
  )
})