import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Id from './Id'
import Comments from './Comments/Comments'
import { actionCreators } from '../../state'

export default (params) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   let a = document.getElementsByClassName(`dot-inner`)[0].style.height 
  //   console.log(a);
  // }, [])

  let data = useSelector((state) => state.post[params.id]);
  let profile = JSON.parse(localStorage.getItem('profile'))

  let [ans, setAns] = useState('')
  let [showComments, setShowComments] = useState(false)
  
  let upAnswer = async (firstToAns) => {
    const temp = await actionCreators.post.upAnswer(ans, data._id, profile._id, profile.source, params.id)
    dispatch(temp)

    if (firstToAns) {setShowComments(true)}
  }

  let toggle = (value, setValue) => {
    if (value===false) {
      setValue(true)
    } else {
      setValue(false)
    }
  }

  let setClass = (if_last) => {
    if (if_last) {
      return "feed-block last-feed"
    } else {
      return "feed-block"
    }
  }

  let firstToAns = () => {
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

      <div className='feed-top'>
        {/* console.log(data.creator); */}
        <Id _id={data.creator._id} source={data.creatorRefModel} full={true}/>

        <div className="question-bar">
          <div className="question-bar-top">
            <div className="question">
              {data.question}
            </div>
            <div className="question-details">
              <div className="small-box question-details-child">
                {data.paid?"Paid":"Free"}
              </div>
              <div className="small-box question-details-child">
                Answered
              </div>
            </div>

          </div>

          <div className="answers-count">
            {(() => {
              let count = data.answers.length
              if (count===0) {
                return 'Not Answered'
              } else if (count===1) {
                return '1 Answer'
              } else {
                return `${count} Answers`
              }
            })()}
          </div>
        </div>

        {data.answers.length ? (
          <button id='if-comments'
          onClick={() => {toggle(showComments, setShowComments)}}
          >
            Show Answers
          </button>
        ) : (<></>)
        }

        {showComments? (
          <div className="answers">
            <div className="answer">
              {/* {data.ans.map((ans, index) => { */}
                <Comments id={params.id}/>
              {/* }} */}
            </div>
          </div>

        ) : (<></>)}

        <div className="user-answer">
          <input 
          className="user-answer" type="text"
          placeholder={firstToAns()}
          onChange={(e) => {setAns(e.target.value)}}/>

          <button
          onClick={() => {upAnswer(data?.answers.length?false:true)}}
          >Submit</button>
        </div>
      </div>


      <div className='feed-more'>
        <p>MORE</p>
      </div>
    </div>
  )
}