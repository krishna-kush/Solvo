import { React, useState, useEffect } from 'react'

import AuthInput from './AuthInput'

export default () => {
  let [logIn, setLogin] = useState(true)
  
  useEffect(() => {
    centerAuthY()
  }, [logIn])
  
  let centerAuthY = () => {
    let authContHeight = document.getElementById('auth-container').offsetHeight
    let auth = document.getElementById('auth')
    let authHeight = auth.offsetHeight

    auth.style.top = `${(authContHeight) - (authContHeight/2) - (authHeight/2)}px`
  }


  return (
    <div id='auth-container'>
      <div id='auth'>
        <div id='welcome' className='small-box'>
          Welcome
        </div>

        {logIn? <>
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
          <div className='login-btn small-box'>LogIn</div>
        </div>

        <div className='more'>
          <div className=''>Or Sign Up Using</div>
          
          <div className='options'>
            <div className='google circle'>G</div>
            <div className='google circle'>F</div>
          </div>
        </div>


        <div className='not-acc'>
          <a onClick={() => {
            setLogin(false)
            centerAuthY() // not working, why?? bcz setLogin will re-render the whole component, but beffore it centerAuthY will run..., so my guess rendering is being done in async way, Solution: use useEffect.
            }} href='#'>Don't have an account? <span>Register</span></a>
        </div>

        </> : <>

        <div className='inputs'>
          <AuthInput name='fname' type='half'/> {/* while changing to Register, if the email text if translated/shifed up and stays there for ex, then fname input text will also display shifted when changes to that, why? because when shifting to Register, React is not removing the previous component, it is just applying changes to it's class as both are of same component with diff. data... */}
          <AuthInput name='lname' type='half'/>

          <AuthInput name='email' type='full'/>
        </div>

        <div id='login-button-cont'>
          <div className='login-btn small-box'>SignUp</div>
        </div>

        </>}

        
      </div>
    </div>
  )
}