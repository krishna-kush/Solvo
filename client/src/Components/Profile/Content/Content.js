import React from 'react'

import { useSelector } from 'react-redux'

import FollowList from './FollowList/FollowList'

const Content = () => {
  const profile = useSelector((state) => state.profile.selected)
  
  switch (profile) {
    case 0:
      return <FollowList content={'following'} /> 
    case 1:
      return <FollowList content={'followers'} /> 
    default:
      return <FollowList content={'following'} /> 
  }
}

export default Content