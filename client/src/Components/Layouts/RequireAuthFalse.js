import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Outlet, Navigate } from 'react-router-dom';

import { actionCreators } from '../../state';

const RequireAuth = () => {
  const dispatch = useDispatch();

  const [ifLogedIn, setIfLogedIn] = useState(false);
  const [loginChecked, setLoginChecked] = useState(false);

  const checkLogin = async () => {
    const temp = await actionCreators.auth.ifLogIn()
    console.log(temp?.status)
    if (temp?.status!==undefined) {
      // alert("You are not logged in")
      console.log("You are not logged in")
    }
    else {
      // console.log("dispatching")
      setIfLogedIn(true)
      temp(dispatch)
    }
    setLoginChecked(true)
  }

  useEffect(() => {
    checkLogin()
  }, [])

  if (!loginChecked) {
    // have a loading screen
    console.log('loading');
    return null
  }

  return (
    ifLogedIn
      ? (<>
        {/* // To understand why when this alert run two times even when path="/". EXPLANATION => So, in react it's not like when url is this that route will run and so on. Maybe react run all the routes at once and pakage them in doing so it run at code to show alert even before loding the site, and when it match the url to provide the package it again run the alert. But for showAlert it's only true when url is "/auth" so it run only once unlike profile which is true for both "/" and "/auth". And hence showAlert really invoke conditional statement. */}
        {/* showAlert ? (<> */}
          {alert("You are already logged in, Logout first!!!")}
          <Navigate to="/"/>
        </>)
      : <Outlet/>
  )
}

export default RequireAuth