import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { actionCreators } from '../../../state'


import Id from '../../Feed/Id/Id'
import ToggleDayNight from './Toggle/DayNight/index'
// import ToggleNormal from './Toggle/Normal/index'
// import Toggle3d from './Toggle/Toggle3d/index'
import ToggleTick from './Toggle/Tick/index'

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

      {/* {show && ( */}
      <div style={{ // can't put display none, as it'll render the comopnent without any width and height and the useEffect hook will run without those, which will set unwanted values
        // visibility: show? 'visible': 'hidden',
        // pointerEvents: show? 'all': 'none',
        display: show? 'block': 'none', // OR putting display none and sending the show in the useEffect dependency array of ToggleTick, when inicialising button position, will also work
      }}  className='header-id-options-cont flex shadow'>
        <li id="header-id-option-profile" className='header-id-option'
        onClick={handle.clickProfile}>
          <Id _id={profile._id} source={profile.source} size={'7vh'} full={true}/>
          <line></line>
        </li>

        <li className='header-id-option nohover'>
          <ToggleDayNight />
        </li>
        <li className='header-id-option nohover'
        // style={{width: '13vw', height: '5vh'}}
        >
          <div className='flex'>
            <p>
              Top User's
            </p>
            <ToggleTick
            state={['homeLayout', 'topShow']}
            onClick={(toggle)=>{actionCreators.changeHomeLayout({topShow: !toggle})(dispatch)}}
            show={show} width={'6vw'} height={'4vh'}/>
          </div>
        </li>
        <li className='header-id-option'>
          Settings
        </li>

        <li className='header-id-option'
        onClick={handle.logOut}>
          LogOut
        </li>
      </div>
      {/* )} */}
    </div>
  )
}

export default IdOptions