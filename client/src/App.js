import React, { useState, useEffect } from 'react';

import {
  Routes,
  Route,
} from "react-router-dom";

// css is imported before componets because those comoponents have their own css and when they import it, I want their css if any contradict with universal css to have priority
import './css/var.css';
import './css/universal.scss';

import './css/content.css'; // need in app.js


import AppBase from './Components/Layouts/AppBase';
import RequireAuth from './Components/Layouts/RequireAuth';
import RequireAuthFalse from './Components/Layouts/RequireAuthFalse';

import Header from './Components/Header/Header';
import Feed from './Components/Feed/Feed';
import TopShow from './Components/TopShow/TopShow';
import Auth from './Components/Auth/Auth';



const root_theme = document.querySelector(':root')
let theme = 'white';
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
  console.log('APP');

  const production = 0; // 0 for development, 1 for production

  // const [theme, setTheme] = useState('dark');


  return (
    <Routes>
      <Route path="/" element={<AppBase/>}>
        {/* Public Routes */}
        {/* Public Routes */}

        {/* Non-Login Routes */}
        <Route element={<RequireAuthFalse/>}>
          <Route path="/auth" element={<Auth/>} />
        </Route>
        {/* Non-Login Routes */}

        {/* Protected Routes */}
        <Route element={<RequireAuth/>}>
          <Route path="/" element={<>
            <Header/>
            <div id="content">
              <Feed production={production}/>
              <TopShow/>
            </div>
          </>}/>
        </Route> 

        <Route element={<RequireAuth/>}>
          <Route path="feed" element={
            <>
              <Header/>
              <div id="content">
                <Feed production={production}/>
                <TopShow/>
              </div>
            </>}/>
        </Route>
        {/* Protected Routes */}

        <Route path="*" element={<>Missing...</>} />
      </Route>
    </Routes>
  );
}

export default App;