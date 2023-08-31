import React from 'react'

import { Outlet } from 'react-router-dom' // means whatever is inside router will be rendered here in Outlet

import Select from '../Select/Select'

const AppBase = () => {
  return (
    <main className="App">
      <Select />
      <Outlet />
    </main>
  )
}

export default AppBase