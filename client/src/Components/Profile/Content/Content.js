import React from 'react'

import { useSelector } from 'react-redux'

import Following from './Following/Following'

const Content = () => {
  const profile = useSelector((state) => state.profile.selected)
  
  switch (profile) {
    case 0:
      return <Following /> 
    case 1:
      return <>Followers</> 
    default:
      return <Following /> 
  }
}

export default Content