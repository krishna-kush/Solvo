import React from 'react'

import { useSelector } from 'react-redux'

import './stats.scss'

const Stats = () => {
  const imgSize = '10vh'

  const profile = useSelector((state) => state.auth.authData);
  console.log(profile);

  return (
    <div id='stats-cont' className='small-panel'>
      <img style={{width: imgSize, height: imgSize}} className="circle" src={profile.photo} />
    </div>
  )
}

export default Stats