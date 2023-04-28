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

import './css/var.css';
import './css/universal.css';
import './css/header.css';
import './css/filterPanel.css';
import './css/feed.css';
import './css/topShow.css';
import './css/content.css';


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
          </>}/>
          
          <Route exact path="/auth" element={<>
            <Header/>
          </>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;