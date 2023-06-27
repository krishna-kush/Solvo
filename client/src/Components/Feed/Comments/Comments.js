import React, { useState } from 'react'

import { useSelector } from 'react-redux'

import Comment from './Comment'

const Comments = (params) => {

  let iter = 0

  let data = useSelector((state) => state.post[params.id].answers);
  // console.log(data[0].like.iter);

  let renderComments = (data, iter) => {
    const comment = (iter) => {return <><Comment _id={data._id} iter={iter} post_id={params.id} comment={data.comment} childComments={data.childComments} creator={data.creator} creatorRefModel={data.creatorRefModel} like={data.like} dislike={data.dislike} share={data.share}/></>}

    let removeStringsFromArray = (arr) => {
      return arr.filter(item => typeof item !== 'string');
    }

    let childComments = removeStringsFromArray(data.childComments)

    if (childComments.length) {
      // iter++
      // setCount((prevCount) => prevCount + 1) // Incrementing Count, inside a func. otherwise it'll also print value of iter in html. The increment in iter is comming after render of parent comment. */}
      return (
        <>
        {comment(iter)}
        {(() => {iter++})()}
        {childComments.map((data, i) => {
          return (
            <React.Fragment key={i}>
            {renderComments(data, iter)}
            </React.Fragment>
          )
        })}
        </>
      )
    }
    return comment(iter)
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
      {renderComments(data, iter)}
      </React.Fragment>
      )
    })}
    </>
  )
}

export default Comments