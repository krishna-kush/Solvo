import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import Header from './Components/Header/Header';
import FilterPanel from './Components/FilterPanel/FilterPanel';
import Feed from './Components/Feed/Feed';
import TopShow from './Components/TopShow/TopShow';
import Changer from './Components/Changer/Changer';
import Auth from './Components/Auth/Auth';


import './css/var.css';
import './css/universal.css';

import './css/header.css';
import './css/filterPanel.css';
import './css/feed.css';
import './css/comment.css';
import './css/topShow.css';
import './css/content.css';
import './css/changer.css';
import './css/auth.css';


const App = () => {
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
          </>}/>
          
          <Route exact path="/auth" element={<>
            <Header/>
            <div id="content">
              <FilterPanel/>
              <Feed/>
              <TopShow/>
            </div>
            <Changer/>
            <Auth/>
          </>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;