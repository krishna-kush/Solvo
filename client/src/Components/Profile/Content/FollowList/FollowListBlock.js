import React from 'react'

import Id from '../../../Feed/Id/Id' 

const FollowListBlock = (params) => {
  return (
    <div className='followlist-block'>
      <Id _id={params.id} full={true} size={'7vh'} />
    </div>
  )
}

export default FollowListBlock