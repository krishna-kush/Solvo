import React from 'react'

import { useSelector } from 'react-redux'

import './following.scss'

import FollowingBlock from './FollowingBlock'

const Followers = () => {

  const following = useSelector((state) => state.auth.authData.following.ids);

  return (
    <div id='followers-cont'>
      {following.map((ele, i) => {
        return (
          <FollowingBlock key={ele} id={ele}/>
        )
      })}
    </div>
  )
}

export default Followers