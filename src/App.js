// External library imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './bootstrap.min.css';

// Component imports
import HomePage from './components/Homepage';
import ChooseGamePage from './components/ChooseGamePage';
import PlayGamePage from './components/PlayGamePage';
import PartyModesPage from './components/PartyModesPage';
import KillerModePage from './components/KillerModePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/choose" element={<ChooseGamePage />} />
          <Route path="/play" element={<PlayGamePage />} />
          <Route path="/party-modes" element={<PartyModesPage />} />
          <Route path="/play/killer" element={<KillerModePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
