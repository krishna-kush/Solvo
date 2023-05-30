import { React } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from '../../state/index'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faEnvelope } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

export default (params) => {
  const dispatch = useDispatch();

  let data = useSelector((state) => state.authI);

  let name = params.name

  let changeData = (what0, what1, to) => {
    dispatch(actionCreators.updateAuthInput([what0, what1, to]))
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

  let setClass = (type) => {
    if (type == 'full') {
      return 'input-cont'
    } else if (type == 'half') {
      return 'input-cont half-i-cont'
    }
  }
  let getName = (name) => {
    if (name == 'email') {
      return 'Email'
    } else if (name == 'password') {
      return 'Password'
    } else if (name == 'fname') {
      return 'First Name'
    } else if (name == 'lname') {
      return 'Last Name'
    }
  }
  let getIcon = (name) => {
    if (name == 'email') {
      return faEnvelope
    } else if (name == 'password') {
      return faKey
    } else if (name == 'fname' || name == 'lname') {
      return faUser
    }
  }

  return (
    <div
      id={`${name}-i`}
      className={setClass(params.type)}

      style={(() => {
        if (params.mnot) {
          return {marginTop: '0px'}
        }
      })()}
      
      onMouseEnter={() => moveText(`${name}`, 1)}
      onMouseLeave={() => {if (!data[name].focus) {moveText(`${name}`, 0)}}}
      >
        <div
        id={`${name}`} className='input-text shift-down-in-input'
        style={moveTextClass(name)} // because after getting to sighup from login component, the text is not moving up, to reset it...
        >
          <p className=''>{getName(name)}</p>
        </div>
        <input type='text' name={`${name}`}
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
        <div id='icon-cont' className='shift-down-in-input'>
          <FontAwesomeIcon icon={getIcon(name)} />
        </div>
      </div>
  )
}
