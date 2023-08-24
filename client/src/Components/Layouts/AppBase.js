import React from 'react'

import { Outlet } from 'react-router-dom' // means whatever is inside router will be rendered here in Outlet

const AppBase = () => {
  return (
    <main className="App">
        <Outlet />
    </main>
  )
}

export default AppBase