import { React, useState, useEffect, useRef } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';

import { GoogleLogin } from '@react-oauth/google'; // useGoogleLogin is for custom button just use onClick and call it's signIn function, Ref: https://www.npmjs.com/package/@react-oauth/google

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import { convertToBase64, resizeAndConvertToBase64 } from '../../Utils/convertImgs.js'

import { actionCreators } from '../../state/index'

import AuthInput from './AuthInput'
import AuthLogInButton from './AuthButtons/AuthLogInButton';
import AuthSignUpButton from './AuthButtons/AuthSignUpButton';

import './auth.css'


export default (params) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loc = location.state
  // console.log('auth'); // log two times??

  const loginBtnRef = useRef(null);

  let [img, setImg] = useState(null)

  const USER_REGEX = /^[A-z][A-z0-9-_]{1,23}$/;
  // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const PWD_REGEX = /.{1,24}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const regex_err_conditions = {
    user: [
      'Username must be 2-24 characters long',
      'Username must start with a letter',
      'Username can only contain letters, numbers, dashes, and underscores',
    ],
    password: [
      'Password must be 8-24 characters long',
      'Password must contain at least one lowercase letter',
      'Password must contain at least one uppercase letter',
      'Password must contain at least one number',
      'Password must contain at least one special character',
    ]
  }

  let [log_in, set_log_in] = useState(true)
  let [auth_width, set_auth_width] = useState(100) // for gAuth style, 100 is lower than the lower limit of gAuth Cont Width

  const changeData = (what0, what1, to) => {
    dispatch(actionCreators.auth.updateInput([what0, what1, to]))
  }

  const from = location.state?.from?.pathname || "/";
  console.log('loc', location.state, location.state?.from?.pathname);

  const googleSuccess = async (res) => {
    const data = {
      clientId: res?.clientId, // ?. is optional chaining(will not show error if profileObj is undefined, but return undefined)
      credential: res?.credential,
    }

    let temp = await actionCreators.auth.google(data)
    temp(dispatch);
    // console.log(authData) // this will not work because authData is not updated yet it'll show previous state, but it'll be updated on next rendering of the signIn component...

    // navigate(to="/" state={{ from: location }} replace)
    // <Navigate to="/else" state={{ from: location }} replace />
    // loc.set(true)
    navigate(from, { replace: true })
  }
  const googleFailure = (error) => {
    console.log(error)
    console.log("failed google auth")
  }

  const handleInputChange = async (e) => {
    const imageFile = e.target.files[0];
    const [max_height, max_width] = [ 50, 50 ]
    
    const base64 = await convertToBase64(imageFile);

    const resizedBase64 = await resizeAndConvertToBase64(imageFile, max_height, max_width); // Resize to desired dimensions

    setImg(resizedBase64);
    changeData('photo', 'value', base64)
  }
  
  // to fix gAuth btn width as Login btn width
  useEffect(() => {
    // for gAuth style // not working for very large width, have limits...

    if (loginBtnRef.current) {
      set_auth_width(loginBtnRef.current.getWidth) // using useImperativeHandle hook
      
      // set_auth_width(loginBtnRef.current.offsetWidth) // using parentRef.current = childRef.current;

      // set_auth_width(getComputedStyle(document.querySelector(':root')).getPropertyValue('--auth-btn-width-percent')) // why this not work?
    }
  }, [loginBtnRef])
  
  return (
    <div id='auth-container'>
      <div id='auth' className='center-absolute'>
        <div id='welcome' className='small-box'>
          {log_in? "Welcome" : "Welcome Again"}
        </div>

        {log_in? <>
        <div className='inputs'>
          <AuthInput name='email' regex={EMAIL_REGEX} type='full'/>
          <AuthInput name='password' regex={PWD_REGEX} err_conditions={regex_err_conditions.password} type='full'/>
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
          <AuthLogInButton ref={loginBtnRef}/>
        </div>

        <div className='login-more'>
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

          <div id='signup-photo-container'>
            <div id='signup-photo' className='circle'>
              { // add load when upload
              img? <img className="id-img circle" src={img} /> :
              <FontAwesomeIcon style={{width:'100%', height:'100%'}} icon={faUserCircle}/>
              }

              <input onChange={handleInputChange} type="file" id='signup-photo-input'/>
            </div>
          </div>

          <div className='short-i-cont'> {/* To have both Inputs move up, when one do. */}
            <AuthInput name='fname' regex={USER_REGEX} err_conditions={regex_err_conditions.user} type='short' length={2}/> {/* FIXED: while changing to Register, if the email text if translated/shifed up and stays there for ex, then fname input text will also display shifted when changes to that, why? because when shifting to Register, React is not removing the previous component, it is just applying changes to it's class as both are of same component with diff. data... */}
            <AuthInput name='lname' regex={USER_REGEX} err_conditions={regex_err_conditions.user} type='short' length={2}/>
          </div>
          <AuthInput name='email' regex={EMAIL_REGEX} type='full' mnot={true}/>
          <AuthInput name='password' regex={PWD_REGEX} err_conditions={regex_err_conditions.password} type='full'/>
          <AuthInput name='confirm_password' type='full'/>
        </div>

        <div id='login-button-cont'>
          <AuthSignUpButton/>
        </div>

        <div className='not-acc'>
          <a onClick={() => {
            set_log_in(true)
            }} href='#'>Already have an account? LogIn</a>
        </div>

        </>}
      </div>
    </div>
  )
}