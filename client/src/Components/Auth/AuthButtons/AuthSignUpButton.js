import { React, useState, useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { actionCreators } from '../../../state/index'


const AuthSignUpButton = (params) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ifErr, setIfErr] = useState(false)

  let data;
  useSelector((state) => {data = state.authI});

  let email_err = useSelector((state) => state.authI.email.err);
  let password_err = useSelector((state) => state.authI.password.err);
  let confirm_password_err = useSelector((state) => state.authI.confirm_password.err);
  let fname_err = useSelector((state) => state.authI.fname.err);
  let lname_err = useSelector((state) => state.authI.lname.err);

  let signUp = async () => {
    let datatosend = {
      email: data.email.value,
      password: data.password.value,
      firstName: data.fname.value,
      lastName: data.lname.value,
      confirmPassword: data.confirm_password.value
    }

    if (datatosend.email === "" || datatosend.password === "" || datatosend.firstName === "" || datatosend.lastName === "" || datatosend.confirmPassword === "") {
      alert("Please fill all the fields")
      return 0
    }

    actionCreators.auth.resetInput()(dispatch)

    let temp = await actionCreators.auth.signUp(datatosend)
    temp(dispatch);

    navigate('/')
  }

  const getClass = (err) => {
    if (err) {return 'fade'}
    return ''
  }

  // to update ifErr
  useEffect(() => {
    if (data.email.err || data.password.err || data.confirm_password.err || data.fname.err || data.lname.err) {
      setIfErr(true)
    } else {setIfErr(false)}
  }, [email_err, password_err, confirm_password_err, fname_err, lname_err])

  return (
    <div id={`signup-btn`} className={`login-btn small-box box transition ${getClass(ifErr)}`}
    onClick={ifErr? ()=>{} : signUp}
    >SignUp</div>
  )
}

export default AuthSignUpButton