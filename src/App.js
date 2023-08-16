// External library imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Component imports
import HomePage from './components/Homepage';
import ChooseGamePage from './components/ChooseGamePage';
import PlayGamePage from './components/PlayGamePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/choose" element={<ChooseGamePage />} />
          <Route path="/play" element={<PlayGamePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
