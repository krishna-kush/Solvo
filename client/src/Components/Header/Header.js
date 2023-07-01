import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { actionCreators } from '../../state'


export default () => {
  const dispatch = useDispatch()

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location]) // because after auth getting to home page does not change info in header...

  let [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  let [searchInput, setSearchInput] = useState('')

  let logOutHandler = () => { 
    dispatch({ type: 'LOGOUT' })
    
    navigate('/auth')
    
    setUser(null)
  }

  let searchHandler = () => {
    const search = searchInput.trim()
    if (search) {
      navigate(`/feed?searchQuery=${search}`) // navigate is a async function...
    } else {
      navigate('/')
    }
  }

  let handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchHandler()
    }
  }

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

      <div id="header-search">
        <input type="text" placeholder="Search"
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyPress}/>
      </div>

      <div id="user-in-header">
      {user? (
        <>
        <div style={{display:"inline-block", marginRight:"10px"}}>
          {user.name}
        </div>
        <button
          style={{display:"inline-block"}}
          onClick={logOutHandler}
        >LogOut</button>
        </>
      )
      : (
        <>
        <Link to="auth">
          LogIn/SignUp
        </Link>
        </>
      )
      }
      </div>
    </header>
  )
}