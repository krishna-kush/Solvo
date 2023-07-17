import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { actionCreators } from './state';

import Header from './Components/Header/Header';
import FilterPanel from './Components/FilterPanel/FilterPanel';
import Feed from './Components/Feed/Feed';
import TopShow from './Components/TopShow/TopShow';
import Changer from './Components/Changer/Changer';
import Auth from './Components/Auth/Auth';


import './css/var.css';
import './css/universal.css';

import './css/header.css';
import './css/search.css';
import './css/filterPanel.css';
import './css/id.css';
import './css/feed.css';
import './css/comment.css';
import './css/topShow.css';
import './css/content.css';
import './css/changer.css';
import './css/auth.css';


const root_theme = document.querySelector(':root')
let theme = 'dark';
// if (theme==='dark') {
//   root_theme.style.setProperty('--base-color', '#351920')
//   root_theme.style.setProperty('--bar-color', '#762034')
//   root_theme.style.setProperty('--box-color', '#bd3a59ae')
//   root_theme.style.setProperty('--in-box-color', '#7a1c32')
// }
if (theme==='dark') {
  root_theme.style.setProperty('--base-color', 'black')
  root_theme.style.setProperty('--bar-color', 'grey')
  root_theme.style.setProperty('--box-color', '#bd3a59ae')
  root_theme.style.setProperty('--in-box-color', '#C9184A')
  root_theme.style.setProperty('--in-box-color-selected', '#420819')
}

const App = () => {
  const dispatch = useDispatch();
  console.log('App');

  const [theme, setTheme] = useState('dark');
  const [ifLogedIn, setIfLogedIn] = useState(false);
  
  // const auth = useSelector(state => state.auth.authData);
  // const ifLogedIn = auth;
  const showAlert = ifLogedIn && window.location.pathname === '/auth'; // and if session is active


  const checkLogin = async () => {
    let temp = await actionCreators.auth.ifLogIn()
    // console.log(temp?.status)
    if (temp?.status!==undefined) {
      // alert("You are not logged in")
      console.log("You are not logged in")
    }
    else {
      console.log("dispatching")
      setIfLogedIn(true)
      temp(dispatch)
    }
  }
  checkLogin()


  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route exact path="/" element={<>
            <Header/>
              <div id="content">
                <FilterPanel/>
                <Feed/>
                <TopShow/>
              </div>
            <Changer/>
          </>} />
          {/* // ifLogedIn ? <>
          //   <Header/>
          //   <div id="content">
          //     <FilterPanel/>
          //     <Feed/>
          //     <TopShow/>
          //   </div>
          //   <Changer/>
          // </> : <Navigate to="/auth"/>}/> */}

          <Route exact path="/feed" element={<>
            <Header/>
            <div id="content">
              <FilterPanel/>
              <Feed/>
              <TopShow/>
            </div>
            <Changer/>
          </>}/>
          
          <Route exact path="/auth" element={
            showAlert ? (<>
            {/* // To understand why when this alert run two times even when path="/". EXPLANATION => So, in react it's not like when url is this that route will run and so on. Maybe react run all the routes at once and pakage them in doing so it run at code to show alert even before loding the site, and when it match the url to provide the package it again run the alert. But for showAlert it's only true when url is "/auth" so it run only once unlike profile which is true for both "/" and "/auth". And hence showAlert really invoke conditional statement. */}
            {/* showAlert ? (<> */}
              {alert("You are already logged in, Logout first!!!")}
              <Navigate to="/"/>
            </>)
           : (
          <>
            <div className='blur'>
              <Header/>
              <div id="content">
                <FilterPanel/>
                <Feed/>
                <TopShow/>
              </div>
              <Changer/>
            </div>
            <Auth/>
          </>)}/>
          

        </Routes>
      </Router>
    </div>
  );
}

export default App;