import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from '../../state/index'

import { GoogleLogin } from '@react-oauth/google'; // useGoogleLogin is for custom button just use onClick and call it's signIn function, Ref: https://www.npmjs.com/package/@react-oauth/google

import AuthInput from './AuthInput'

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let data = useSelector((state) => state.authI);

  let [log_in, set_log_in] = useState(true)
  let [auth_width, set_auth_width] = useState(100) // for gAuth style, 100 is lower than the lower limit of gAuth Cont Width
  
  useEffect(() => {
    centerAuthY()
  }, [log_in])
  useEffect(() => {
    set_auth_width(document.getElementById('login-btn').offsetWidth) // for gAuth style // not working for very large width, have limits...
    // set_auth_width(getComputedStyle(document.querySelector(':root')).getPropertyValue('--auth-btn-width-percent'))
  }, [])
  
  let centerAuthY = () => {
    let authContHeight = document.getElementById('auth-container').offsetHeight
    let auth = document.getElementById('auth')
    let authHeight = auth.offsetHeight

    auth.style.top = `${(authContHeight) - (authContHeight/2) - (authHeight/2)}px`
  }

  let logIn = async () => {
    let datatosend = {
      email: data.email.value,
      password: data.password.value,
    }

    if (datatosend.email === "" || datatosend.password === "") {
      alert("Please fill all the fields")
      return 0
    }
    
    let temp = await actionCreators.auth.logIn(datatosend)

    if (temp.status) {
      alert(temp.message)
      return 0
    }

    temp(dispatch);
    
    actionCreators.auth.resetInput()(dispatch); // this is another way to dispatch in one line, but it'll not work for async functions... like below
    
    // dispatch(actionCreators.auth.resetInput()); // OR
    // let reset = actionCreators.auth.resetInput()
    // dispatch(reset); // this will clear the input fields, for when we reLogin


    navigate('/')
  }
  let signUp = async () => {
    let datatosend = {
      email: data.email.value,
      password: data.password.value,
      firstName: data.fname.value,
      lastName: data.lname.value,
    }

    actionCreators.auth.resetInput()(dispatch)

    let temp = await actionCreators.auth.signUp(datatosend)
    temp(dispatch);

    navigate('/')
  }

  let googleSuccess = async (res) => {
    const data = {
      clientId: res?.clientId, // ?. is optional chaining(will not show error if profileObj is undefined, but return undefined)
      credential: res?.credential,
    }

    let temp = await actionCreators.auth.google(data)
    temp(dispatch);
    // console.log(authData) // this will not work because authData is not updated yet it'll show previous state, but it'll be updated on next rendering of the signIn component...

    navigate('/')
  }
  let googleFailure = (error) => {
    console.log(error)
    console.log("failed google auth")
  }

  return (
    <div id='auth-container'>
      <div id='auth'>
        <div id='welcome' className='small-box'>
          {log_in? "Welcome" : "Welcome Again"}
        </div>

        {log_in? <>
        <div className='inputs'>
          <AuthInput name='email' type='full'/>
          <AuthInput name='password' type='full'/>
        </div>

        <div className='auth-options'>
          <div className='remember-me'>
            <label><input type='checkbox'/><p>Remember Me</p></label>
          </div>

          <div className='forget-pass'>
            <a href='#'>Forget Password?</a>
          </div>
        </div>

        <div id='login-button-cont'>
          <div id='login-btn' className='login-btn small-box'
          onClick={logIn}
          >LogIn</div>
        </div>

        <div className='more'>
          <p className=''> OR</p>
            <div
            style={{width: auth_width, margin: "auto",}}
            >
            <GoogleLogin
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              // cookiePolicy="single_host_origin"
              useOneTap

              width={auth_width}
              // shape="square"
            />
            </div>
          {/* <div className='options'>
            <div className='google circle'>G</div>
            <div className='google circle'>F</div>
          </div> */}
        </div>


        <div className='not-acc'>
          <a onClick={() => {
            set_log_in(false)
            // centerAuthY() // FIXED: not working, why?? bcz set_log_in will re-render the whole component, but beffore it centerAuthY will run..., so my guess rendering is being done in async way, Solution: use useEffect.
            }} href='#'>Don't have an account? <span>Register</span></a>
        </div>

        </> : <>

        <div className='inputs'>
          <AuthInput name='fname' type='half'/> {/* FIXED: while changing to Register, if the email text if translated/shifed up and stays there for ex, then fname input text will also display shifted when changes to that, why? because when shifting to Register, React is not removing the previous component, it is just applying changes to it's class as both are of same component with diff. data... */}
          <AuthInput name='lname' type='half'/>

          <AuthInput name='email' type='full' mnot={true}/>
          <AuthInput name='password' type='full'/>
        </div>

        <div id='login-button-cont'>
          <div className='login-btn small-box'
            onClick={signUp}
          >SignUp</div>
        </div>

        <div className='not-acc'>
          <a onClick={() => {
            set_log_in(true)
            }} href='#'>LogIn</a>
        </div>

        </>}

        
      </div>
    </div>
  )
}