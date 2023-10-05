import React from 'react'

import { useSelector } from 'react-redux'

import FollowList from './FollowList/FollowList'

const Content = (params) => {
  const profile = useSelector((state) => state.profile.selected)
  
  switch (profile) {
    case 0:
      return <FollowList data={params.data.following.ids} content={'following'} /> 
    case 1:
      return <FollowList data={params.data.followers.ids} content={'followers'} /> 
    default:
      return <FollowList data={params.data.following.ids} content={'following'} /> 
  }
}

export default Content