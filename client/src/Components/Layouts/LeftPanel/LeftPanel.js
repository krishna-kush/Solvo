import React from 'react'

import { Outlet } from 'react-router-dom' // means whatever is inside router will be rendered here in Outlet

import './leftPanel.scss'

const LeftPanel = () => {
  return (
    <leftPanel>
      <Outlet />
    </leftPanel>
  )
}

export default LeftPanel