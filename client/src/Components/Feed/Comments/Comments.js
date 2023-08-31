import React from 'react'

import { useSelector } from 'react-redux'

import Comment from './Comment'

import './comment.css'

const Comments = (params) => {

  let iter = 0

  const data = useSelector((state) => state.post[params.id].answers);
  const selected = useSelector((state) => state.post[params.id].selected);
  // console.log(data);

  let parent_comment_id = null; // to store parent comment id, why? to pass it to the child comment, it'll help in deleting the comment

  let renderComments = (data, iter, selected) => {
    const comment = <><Comment _id={data._id} parentId={parent_comment_id} selected={selected} iter={iter} post_id={params.id} comment={data.comment} childComments={data.childComments} creator={data.creator} creatorRefModel={data.creatorRefModel} like={data.like} dislike={data.dislike} share={data.share} createdAt={data.createdAt} /></>

    parent_comment_id = data._id;

    let removeStringsFromArray = (arr) => {
      return arr.filter(item => typeof item !== 'string');
    }

    let childComments = removeStringsFromArray(data.childComments)

    if (childComments.length) {
      // iter++
      // setCount((prevCount) => prevCount + 1) // Incrementing Count, inside a func. otherwise it'll also print value of iter in html. The increment in iter is comming after render of parent comment. */}
      return (
        <>
        {comment}
        {(() => {iter++})()}
        {childComments.map((data, i) => {
          return (
            <React.Fragment key={i}>
            {renderComments(data, iter, false)}
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
      {renderComments(data, iter, data._id === selected? true: false)}
      </React.Fragment>
      )
    })}
    </>
  )
}

export default Comments