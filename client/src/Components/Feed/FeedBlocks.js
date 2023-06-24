import { React, useState, useEffect} from 'react'

import { useSelector } from 'react-redux'

import Id from './Id'
import Comments from './Comments'
import { actionCreators } from '../../state'

export default (params) => {

  // useEffect(() => {
  //   let a = document.getElementsByClassName(`dot-inner`)[0].style.height 
  //   console.log(a);
  // }, [])

  let data = useSelector((state) => state.post[params.id]);
  let profile = JSON.parse(localStorage.getItem('profile'))
  // console.log(data);

  let [ans, setAns] = useState('')
  let upAnswer = () => {
    actionCreators.post.upAnswer(ans, data._id, profile._id, profile.source)
  }

  let [showComments, setShowComments] = useState(false)

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
    if (data?.ans) return `Write your answer...`
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
            7k answers
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

          <div
          onClick={upAnswer}
          >Submit</div>
        </div>
      </div>


      <div className='feed-more'>
        <p>MORE</p>
      </div>
    </div>
  )
}