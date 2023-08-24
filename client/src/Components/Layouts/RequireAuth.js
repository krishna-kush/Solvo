import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { Outlet, Navigate } from 'react-router-dom';

import { actionCreators } from '../../state';

const RequireAuth = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.authData);

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

  // console.log('from provider', auth, ifLogedIn);

  if (!loginChecked) {
    // have a loading screen
    console.log('loading');
    return null
  }

  return (
    ifLogedIn || auth
      ? <Outlet/>
      : <Navigate to="/auth" />
  )
}

export default RequireAuth