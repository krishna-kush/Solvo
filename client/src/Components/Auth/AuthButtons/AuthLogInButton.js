import { React, useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { actionCreators } from '../../../state/index'


const AuthLogInButton = forwardRef((params, ref) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const divRef = useRef(null)
  // comment: if not want to set parent ref to full child ref(Like Done Below in useEffect), can add functions to parent ref to access specific elements of child ref
  useImperativeHandle(ref, () => ({
    getWidth: () => divRef.current.offsetWidth
  }));

  const [ifErr, setIfErr] = useState(false)

  let data;
  useSelector((state) => {
    /*
    This does not perform re-render but when we do it like this, let data = useSelector((state) => state.authI), it does perform re-render because We are actually returning the value of state in data and when we perform an return and save it in a variable.

    React Redux creates an implicit dependency between the component and the selected state (state.authI). This dependency is established because data is assigned the value returned by useSelector, which is essentially the selected state value. Therefore, whenever state.authI changes, React Redux knows that the component needs to be re-rendered to reflect the updated value.
    
    But if we do like we have done there is no implicit dependency between the component and the selected state (state.authI). Although you are assigning the value of state.authI to the data variable within the useSelector callback, React Redux is not aware of this assignment and we do return statement to a variable. As a result, React Redux does not consider this assignment as a dependency for triggering re-renders.
    
    It's just like making a variable and using it in html and updating it from a function by calling it, But it won't update the variable in the html because their is not dependency here, Hence the component will not re-render.
    */
    data = state.authI;
  });

  let email_err = useSelector((state) => state.authI.email.err);
  let password_err = useSelector((state) => state.authI.password.err);

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
    
    actionCreators.auth.resetInput()(dispatch)

    temp(dispatch);
    
    actionCreators.auth.resetInput()(dispatch); // this is another way to dispatch in one line, but it'll not work for async functions... like below
    
    // dispatch(actionCreators.auth.resetInput()); // OR
    // let reset = actionCreators.auth.resetInput()
    // dispatch(reset); // this will clear the input fields, for when we reLogin

    navigate('/')
  }

  const getClass = (err) => {
    if (err) {return 'fade'}
    return ''
  }

  // to update ifErr
  useEffect(() => {
    if (data.email.err || data.password.err) {
      setIfErr(true)
    } else {setIfErr(false)}
  }, [email_err, password_err])

  // DO NOT REMOVE!!! (Way to add child ref to parent ref)
  // to update parent ref to resize google login to site login btn
  // useEffect(() => {
  //   ref.current = divRef.current;
  // }, []);

  return (
    <div ref={divRef} id={`${params.id}-btn`} className={`login-btn small-box box transition ${getClass(ifErr)}`}
    onClick={ifErr? ()=>{} : logIn}
    >LogIn</div>
  )
})

export default AuthLogInButton