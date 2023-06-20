import React from 'react'

import { useSelector } from 'react-redux'

import Comment from './Comment'

const Comments = (params) => {

  let comments_len = useSelector((state) => state.post[params.id].answers.length);
  let comments = []
  for (let i = 0; i < comments_len; i++) {
    comments.push(i)
  }


  if (!comments) {
    return (
      <div>Loding...</div>
    )
  }

  return (
    <>
    {comments.map((index) => {
      return <Comment id={params.id} index={index}/>
    })}
    </>
  )
}

export default Comments