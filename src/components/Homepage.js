import React from 'react';
import { Link } from 'react-router-dom';
import Dartboard from './Dartboard';
import './DartyPartyLogo.css';

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
          <svg style={{ height: 0, width: 0, position: 'absolute' }}>
            <filter id="roundedOutline">
                <feMorphology in="SourceAlpha" result="expanded" operator="dilate" radius="1"/>
                <feGaussianBlur in="expanded" result="blurred" stdDeviation="0.5"/>
                <feFlood floodColor="#fff" result="color"/>
                <feComposite in="color" in2="blurred" operator="in" result="softOutline"/>
                <feComposite in="softOutline" in2="SourceAlpha" operator="out" result="softOutline"/>
                <feMerge>
                    <feMergeNode in="softOutline"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </svg>
          <h2 className="logo">Darty Party!</h2>
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
