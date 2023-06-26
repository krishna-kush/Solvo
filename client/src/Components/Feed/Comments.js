import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import Comment from './Comment'

const Comments = (params) => {

  let count = 0

  let data = useSelector((state) => state.post[params.id].answers);

  let renderComments = (data, count) => {
    const comment = (iter) => {return <><Comment _id={data._id} iter={iter} post_id={params.id} comment={data.comment} childComments={data.childComments} creator={data.creator} creatorRefModel={data.creatorRefModel} like={data.like} dislike={data.dislike}/></>}

    let removeStringsFromArray = (arr) => {
      return arr.filter(item => typeof item !== 'string');
    }

    let childComments = removeStringsFromArray(data.childComments)

    if (childComments.length) {
      // count++
      // setCount((prevCount) => prevCount + 1) // Incrementing Count, inside a func. otherwise it'll also print value of count in html. The increment in count is comming after render of parent comment. */}
      return (
        <>
        {comment(count)}
        {(() => {count++})()}
        {childComments.map((data, i) => {
          return (
            <React.Fragment key={i}>
            {renderComments(data, count)}
            </React.Fragment>
          )
        })}
        </>
      )
    }
    return comment(count)
  }


  if (!data) {
    return (
      <div>Loding...</div>
    )
  }

  return (
    <>
    {data.map((data, i) => {
      return (
      <React.Fragment key={i}>
      {/* // to compile html without div */}
      {renderComments(data, count)}
      </React.Fragment>
      )
    })}
    </>
  )
}

export default Comments