import React from 'react'

import Id from '../../../Feed/Id/Id' 

const FollowersBlock = (params) => {
  return (
    <div className='followers-block'>
      <Id _id={params.id} source={'own'} full={true} size={'7vh'} />
    </div>
  )
}

export default FollowersBlock