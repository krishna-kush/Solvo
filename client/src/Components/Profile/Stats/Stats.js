import React from 'react'

import { useSelector } from 'react-redux'

import './stats.scss'

const Stats = () => {
  const imgSize = '10vh'

  const profile = useSelector((state) => state.auth.authData);
  console.log(profile);
  // profile.postsCount is not updated value this way, need to find it right now, or mantain a state for it changes when create or delete post

  return (
    <div id='stats-cont' className='flex small-panel'>
      <div id='stats-img'>
        <img style={{width: imgSize, height: imgSize}} className="circle" src={profile.photo} />
      </div>

      <div className='flex-col'>
        <div className=''>
          {profile.name}
        </div>
        <div className=''>
          Software Engineer
        </div>
        <div className=''>
          Answered 10 Question
        </div>
        <div className=''>
          Post {profile.postsCount} Questions
        </div>
        <div className=''>
          Rating 4.5
        </div>
        

      </div>
    </div>
  )
}

export default Stats