import { React, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from '../../state/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons'


export default (params) => {
  const dispatch = useDispatch();

  const contRef = useRef(null);
  const inputContRef = useRef(null);
  const errTxtRef = useRef(null);

  let data = useSelector((state) => state.authI);

  let name = params.name

  let changeData = (what0, what1, to) => {
    dispatch(actionCreators.auth.updateInput([what0, what1, to]))
  }
  let textChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    changeData(name, 'value', value)
  }

  let moveText = (name, dir) => {
    let text = document.getElementById(name)
    if (!dir && data[name].value == '') {
      text.style.transform = 'translateY(0%)'
    } else {
      text.style.transform = 'translateY(-100%)'
    }
  }
  let moveTextClass = (name) => {
    if (data[name].value == '') {
      return {transform: "translateY(0%)"}
    } else {
      return {transform: "translateY(-100%)"}
    }
  }
  
  let getName = (name) => {
    if (name == 'email') {
      return 'Email'
    } else if (name == 'password') {
      return 'Password'
    } else if (name == 'confirm_password') {
      return 'Re-Enter Password'
    } else if (name == 'fname') {
      return 'First Name'
    } else if (name == 'lname') {
      return 'Last Name'
    }
  }
  let getIcon = (name) => {
    if (name === 'email') {
      return faEnvelope
    } else if (name === 'password' || name === 'confirm_password') {
      return faKey
    } else if (name === 'fname' || name === 'lname') {
      return faUser
    }
  }

  // check if input is valid and showing err if there is and adding box shadow style accordingly
  useEffect(() => {
    let err_color = window.getComputedStyle(document.documentElement).getPropertyValue('--err-color');
    let transition_time = window.getComputedStyle(document.documentElement).getPropertyValue('--transition-time');

    let condition;
    let text;

    if (name === 'confirm_password') {
      condition = data.confirm_password.value && (data.password.value != data.confirm_password.value)
      text = `Password Don't Match`
    } else {
      condition = data[name].value && !params.regex.test(data[name].value)
      text = `Not a valid ${getName(name)}`
    }

    if (condition) {
      errTxtRef.current.textContent = text
      errTxtRef.current.classList.remove('hidden')
      
      inputContRef.current.style.setProperty('box-shadow', `0 0 0 1px ${err_color}`)

      // updating err authInput state to be used in AuthButton to know if there is err in input
      changeData(name, 'err', true)
    } else {
      errTxtRef.current.classList.add('hidden')
      setTimeout(() => {
        errTxtRef.current.textContent = ''
      }, parseInt(transition_time)); // to match with transition time

      inputContRef.current.style.setProperty('box-shadow', '0 0 0 1px white')

      changeData(name, 'err', false)
    }
  }, (() => { // to make conform_password have multiple dependencies while everything else but one
    if (name==='confirm_password') {
      return [data.confirm_password.value, data.password.value]
    } else { return [data[name].value] }
  })())

  useEffect(() => {
    if (params.type === 'short') {
      contRef.current.style.setProperty('width', `calc((var(--auth-input-cont-width) - var(--auth-input-cont-half-gap)) / ${params.length})`)
    }
  }, [])

  return (
    <div
      ref={contRef}
      id={`${name}-i`}
      className='input-cont'

      style={(() => {
        if (params.mnot) {
          return {marginTop: '0px'}
        }
      })()}
      
      onMouseEnter={() => moveText(`${name}`, 1)}
      onMouseLeave={() => {if (!data[name].focus) {moveText(`${name}`, 0)}}}
      >
        <div
        id={`${name}`} className='input-text input-margin-left shift-down-in-input transition'
        style={moveTextClass(name)} // because after getting to sighup from login component, the text is not moving up, to reset it...
        >
          <p className=''>{getName(name)}</p>
        </div>
        {/* <div ref={inputContRef} className='auth-input out-light'> */}
        <div ref={inputContRef} className='auth-input transition'>
          <input
          type='text'
          name={`${name}`}
          className='input-margin-left'

          onChange={textChange}
          onFocus={() => {
            moveText(`${name}`, 1)
            changeData(`${name}`, 'focus', true)
          }}
          onBlur={() => {
            moveText(`${name}`, 0)
            changeData(`${name}`, 'focus', false)
          }}
          value={data[name].value}
          ></input>
          <div id={`${name}-icon-cont`} className='auth-icon-cont'>
          {/* <div id={`${name}-icon-cont`} className='auth-icon-cont shift-down-in-input'> */}
            <FontAwesomeIcon icon={getIcon(name)} />
          </div>
        </div>
        <div ref={errTxtRef} className='err-msg input-margin-left transition'>{/* Transition can't make it's effect on the text inside but can only on styles. Hence I added hidden class from useEffect */}</div>
      </div>
  )
}
