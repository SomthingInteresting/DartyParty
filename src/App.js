// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './components/Homepage.js';
import ChooseGamePage from './components/ChooseGamePage.js';
import PlayGamePage from './components/PlayGamePage.js';



// We will create these components in the next steps:
// import ChooseGamePage from './components/ChooseGamePage.js';
// import PlayGamePage from './components/PlayGamePage.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/choose" element={<ChooseGamePage />} />
          <Route path="/play" element={<PlayGamePage />} />
          {/* The following routes are placeholders and will be active once we create the components */}
          {/* <Route path="/choose" element={<ChooseGamePage />} />
          <Route path="/play" element={<PlayGamePage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
