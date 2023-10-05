import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import Id from '../../Feed/Id/Id'

import './idOptions.scss'
import { toggle } from '../../../Utils/Basic'

const IdOptions = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [show, setShow] = useState(false)

  const profile = useSelector((state) => state.auth.authData);


  const handle = {
    show: () => {
      toggle(show, setShow)
    },

    logOut: () => { 
      dispatch({ type: 'LOGOUT' })
      
      // setUser(null)
      
      // navigate('/auth')
      navigate('/auth', { replace: true })
    },
    
    clickProfile: () => {
      navigate(`${profile._id}`, { replace: true })
    }
  }

  return (
    <>
    <div className='header-id'
    onClick={handle.show}>
      <img className="circle" src={profile.photo} />
    </div>

    {show && (
    <div className='header-id-options-cont flex shadow'>
      <li id="header-id-option-profile" className='header-id-option'
      onClick={handle.clickProfile}>
        <Id _id={profile._id} source={profile.source} size={'7vh'} full={true}/>
        <line></line>
      </li>

      <li className='header-id-option'>
        Settings
      </li>

      <li className='header-id-option'
      onClick={handle.logOut}>
        LogOut
      </li>
    </div>
    )}

    </>
  )
}

export default IdOptions