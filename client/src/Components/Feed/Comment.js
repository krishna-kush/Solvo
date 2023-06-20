import React from 'react'

import { useSelector } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faComment, faArrowUpFromBracket as share } from '@fortawesome/free-solid-svg-icons'

import { actionCreators } from '../../state/index'

import Id from './Id'

const Comments = (params) => {
  let get = () => {
    actionCreators.comment.getComment()
  }

  let data = useSelector((state) => state.post[params.id].answers[params.index]);
  // console.log(data);


  if (!data) {
    return (
      <div>Loding...</div>
    )
  }

  return (
    <div className="comment-cont">
      <Id _id={data.creator._id} source={data.creatorRefModel} full={false}/>

      <div className='comment-content'>
        <div className="comment">
          {data.comment}
        </div>

        <div className='interact-comment'>
          <div className='interact-comment-child upvote'>
            <left className='icon'>
              <FontAwesomeIcon icon={faArrowUp} />
            </left>
            <div>
              {data.like.count}
            </div>
          </div>
          <div className='interact-comment-child downvote'>
            <left className='icon'>
              <FontAwesomeIcon icon={faArrowDown} />
            </left>
            <div>
            {data.dislike.count}
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
      </div>

      {/* <div className='more'>
          <div className="comment-cont">
          <Id id={params.id} full={false}/>

          <div className='comment-content'>
            <div className="comment">
              <p>{params.ans}</p>
            </div>

            <div className='interact-comment'>
              <div className='interact-comment-child upvote'>
                <left className='icon'>
                  <FontAwesomeIcon icon={faArrowUp} />
                </left>
                <div>
                  20k
                </div>
              </div>
              <div className='interact-comment-child downvote'>
                <left className='icon'>
                  <FontAwesomeIcon icon={faArrowDown} />
                </left>
                <div>
                  10k
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
          </div>
          </div>
      </div> */}

      <div onClick={get}>get</div>
    </div>
  )
}

export default Comments