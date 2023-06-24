import React from 'react'

import { useSelector } from 'react-redux'

import Comment from './Comment'

const Comments = (params) => {

  let data = useSelector((state) => state.post[params.id].answers);

  let renderComments = (data) => {
    const comment = <><Comment _id={data._id} post_id={params.id} comment={data.comment} childComments={data.childComments} creator={data.creator} creatorRefModel={data.creatorRefModel} like={data.like} dislike={data.dislike}/></>

    if (data.childComments.length && (typeof data.childComments[0] != 'string') ) {
      return (
        <>
        {comment}
        {data.childComments.map((data, i) => {
          return (
            <React.Fragment key={i}>
            {renderComments(data)}
            </React.Fragment>
          )
        })}
        </>
      )
    }
    return comment
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
      {renderComments(data)}
      </React.Fragment>
      )
    })}
    </>
  )
}

export default Comments