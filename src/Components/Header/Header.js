import React from 'react'
import { Link } from "react-router-dom";


export default () => {
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
        <input type="text" placeholder="Search" />
      </div>

      <div id="user-in-header">
        Guest
        <Link to="auth">
          LogIn/SignUp
        </Link>
      </div>
    </header>
  )
}