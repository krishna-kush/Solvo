import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import Id from '../../Feed/Id/Id'

import './idOptions.scss'
import { toggle } from '../../../Utils/Basic'

const IdOptions = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const componentRef = useRef(null);

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

  // to toggle Options when clicked outside of it (from Search.js, go there for more info)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if ((componentRef.current) && 
        (!componentRef.current.contains(event.target))) {
        setShow(false)
      }
    };

    if (componentRef.current) document.addEventListener('mousedown', handleClickOutside);

    return () => {
      if (componentRef.current) document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div ref={componentRef} id='header-id-cont'>
      <div className='header-id'
      onClick={handle.show}>
        <img className="circle" src={profile.photo} />
      </div>

      {show && (
      <div  className='header-id-options-cont flex shadow'>
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
    </div>
  )
}

export default IdOptions