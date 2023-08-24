import React from 'react';
import { Link } from 'react-router-dom';
import Dartboard from './Dartboard';

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        
        {/* Dartboard Column */}
        <div className="col-md-6 text-center">
          <Dartboard />
        </div>
        
        {/* Description and Buttons Column */}
        <div className="col-md-6 text-center">
          <h2>Darty Party!</h2>
          <p>Choose your game mode:</p>
          <Link to="/choose">
            <button className="btn btn-primary btn-lg mt-3">Classic Mode</button>
          </Link>
          <Link to="/party-modes">
            <button className="btn btn-secondary btn-lg mt-3 ml-3">Party Modes</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
