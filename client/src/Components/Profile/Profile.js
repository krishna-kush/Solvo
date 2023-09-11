import React from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward } from '@fortawesome/free-solid-svg-icons'

import './profile.scss'

import Stats from './Stats/Stats'
import Following from './Following/Following'


const Profile = () => {
  return (
    <div id='profile-cont' className='left-panel-cont'>
      <Stats/>

      <div id='profile-control' className='flex'>
        <div className='profile-options box'>
          Following
        </div>
        <div className='profile-goback box transition-fast'>
          <FontAwesomeIcon className='fa-icon transition-fast' icon={faBackward} />
        </div>
      </div>

      <Following/>
    </div>
  )
}

export default Profile