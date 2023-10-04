import React from 'react'

import { useSelector } from 'react-redux'

import './followList.scss'

import FollowListBlock from './FollowListBlock'

const Followers = (params) => {

  const follow = useSelector((state) => {
    if (params.content === 'following') {
      return state.auth.authData.following.ids
    } else if (params.content === 'followers') {
      return state.auth.authData.followers.ids
    }
  });

  // console.log(follow);

  return (
    <div id='followlist-cont'>
      {follow.map((ele, i) => {
        return (
          <FollowListBlock key={ele} id={ele}/>
        )
      })}
    </div>
  )
}

export default Followers