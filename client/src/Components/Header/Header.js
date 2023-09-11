import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import Search from './Search/Search'
import IdOptions from './IdOptions/IdOptions'

import './header.css'


export default () => {
  const dispatch = useDispatch()

  const location = useLocation()
  const navigate = useNavigate()

  const user = useSelector((state) => state.auth.authData)

  useEffect(() => {
    // setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location]) // because after auth getting to home page does not change info in header...

  // let [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const from = location.state?.from?.pathname || "/";

  return (
    <header id="header">
      <div id="header-logo">
        <div id="header-logo-img">
          <Link to="/">
            <img src="/images/logo.png" alt="logo" />
          </Link>
        </div>
        <div id="header-logo-text">
          <Link to="/">
          <div id="header-logo-text">
            sOlvO
          </div>
          </Link>
        </div>
      </div>

      <Search/>

      <div id="user-in-header">
        <div style={{height: "100%"}} className='flex'>
        {user? (
          <>
            <IdOptions/>
          </>
        )
        : (
          <Link to="auth">
            LogIn/SignUp
          </Link>
        )
        }
        </div>
      </div>
    </header>
  )
}