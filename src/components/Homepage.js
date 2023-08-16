// src/components/Homepage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h2>Darty Party!</h2>
          <p>Choose your game mode:</p>
          <Link to="/choose">
            <button className="btn btn-primary btn-lg mt-3">Classic Mode</button>
          </Link>
          <button className="btn btn-secondary btn-lg mt-3 ml-3" disabled>
            Party Modes {/* Disabled until the logic for this mode is implemented */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
