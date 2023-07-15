import { React, useEffect, useRef, useState } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from '../../state/index'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEye, faEyeSlash, faUser, faCircleInfo } from '@fortawesome/free-solid-svg-icons'


export default (params) => {
  const dispatch = useDispatch();

  const contRef = useRef(null);
  const inputContRef = useRef(null);
  const errTxtRef = useRef(null);
  const errInfoIconRef = useRef(null);
  const errInfoRef = useRef(null);

  const [inputType, setInputType] = useState('password')
  const [inputTypeIcon, setInputTypeIcon] = useState(faEye)

  const [showErrInfo, setShowErrInfo] = useState(false)

  let data = useSelector((state) => state.authI);

  let name = params.name

  const changeData = (what0, what1, to) => {
    dispatch(actionCreators.auth.updateInput([what0, what1, to]))
  }
  const textChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    changeData(name, 'value', value)
  }

  const togglePassword = () => {
    if (inputType==='text') {
      setInputType('password')
      setInputTypeIcon(faEye)
    } else {
      setInputType('text')
      setInputTypeIcon(faEyeSlash)
    }
  }

  const moveText = (name, dir) => {
    let text = document.getElementById(name)
    if (!dir && data[name].value == '') {
      text.style.transform = 'translateY(0%)'
    } else {
      text.style.transform = 'translateY(-100%)'
    }
  }
  const moveTextClass = (name) => {
    if (data[name].value == '') {
      return {transform: "translateY(0%)"}
    } else {
      return {transform: "translateY(-100%)"}
    }
  }
  
  const getName = (name) => {
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
  const getIcon = (name) => {
    if (name === 'email') {
      return faEnvelope
    } else if (name === 'password' || name === 'confirm_password') {
      return inputTypeIcon
    } else if (name === 'fname' || name === 'lname') {
      return faUser
    }
  }

  // check if err and showing err if there is and adding box shadow style accordingly
  useEffect(() => {
    let err_color = window.getComputedStyle(document.documentElement).getPropertyValue('--err-color');
    let transition_time = window.getComputedStyle(document.documentElement).getPropertyValue('--transition-time');

    let text;

    if (name === 'confirm_password') {
      text = `Password Don't Match`
    } else {
      text = `Not a valid ${getName(name)}`
    }

    // for handling if to show err icon
    if (params?.err_conditions) {
      if (name==='lname') {
        if (data.fname.err || data.lname.err) {
          errInfoIconRef.current.classList.remove('d-none')
        } else {
          errInfoIconRef.current.classList.add('d-none')
        }
      } else if (data[name].err && name!=='fname') {
        errInfoIconRef.current.classList.remove('d-none')
      } else {
        errInfoIconRef.current.classList.add('d-none')
      }
    }

    // for handling if to show err msg and err box shodow on div boundry
    if (data[name].err) {
      errTxtRef.current.textContent = text
      errTxtRef.current.classList.remove('hidden')
      
      inputContRef.current.style.setProperty('box-shadow', `0 0 0 1px ${err_color}`)
      
      // updating err authInput state to be used in AuthButton to know if there is err in input
    } else {
      errTxtRef.current.classList.add('hidden')
      setTimeout(() => {
        errTxtRef.current.textContent = ''
      }, parseInt(transition_time)); // to match with transition time

      inputContRef.current.style.setProperty('box-shadow', '0 0 0 1px white')
    }
  }, (() => {
    if (name==='lname') { // if lname want to show err icon even if err in fname
      return [data.fname.err, data.lname.err]
    } else { return [data[name].err] }
  })())
  
  // to change err info for input
  useEffect(() => {
    if (name==='confirm_password') {
      if (data.confirm_password.value && (data.password.value != data.confirm_password.value)) {
        changeData(name, 'err', true)
      } else {
        changeData(name, 'err', false)
      }
    } else {
      if (data[name].value && !params.regex.test(data[name].value)) {
        changeData(name, 'err', true)
      } else {
        changeData(name, 'err', false)
      }
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

  // to position the errInfo div
  useEffect(() => { // cann't place if condition outside the hook, means cann't conditionally render hook, because react keep count of hook and if that mismatch it'll throw an error
      if (params?.err_conditions) {
      errInfoRef.current.style.top = `calc(-${errInfoRef.current.offsetHeight}px - var(--short-margin))`
      errInfoRef.current.style.left = `calc(100% - (${errInfoRef.current.offsetWidth}px/2))`
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
          type={name==='password'||name==='confirm_password'? inputType : 'text'}
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
            <FontAwesomeIcon icon={getIcon(name)}
            onClick={name==='password' || name==='confirm_password'? togglePassword : ()=>{}}
            />
          </div>
        </div>

        {params?.err_conditions? <>
          <div ref={errInfoIconRef}
          className='err-info-icon shift-down-in-input input-margin-left d-none transition'
          >
            <FontAwesomeIcon 
            icon={faCircleInfo} 

            onMouseEnter={() => {setShowErrInfo(true)}}
            onMouseLeave={() => {setShowErrInfo(false)}}
            />
          </div>

          <div
          ref={errInfoRef}
          id={`${name}-err-info`} 
          className={`err-info shift-down-in-input input-margin-left transition ${showErrInfo?'':'hidden'}`}>
            {params.err_conditions.map((err, index) => {
              return ( <>
                <p key={index} className=''>{err}</p>
                {index===(params.err_conditions.length-1)?<></>:<hr/>}
              </>)
            })}
          </div>
        </> : <></>}
        <div ref={errTxtRef} className='err-msg input-margin-left transition'>{/* Transition can't make it's effect on the text inside but can only on styles. Hence I added hidden class from useEffect */}</div>
      </div>
  )
}
