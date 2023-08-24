// src/components/PartyModesPage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

function PartyModesPage() {
  const navigate = useNavigate();

  const startKillerMode = () => {
    // Navigate to the Killer mode gameplay page
    navigate('/play/killer');
  };

  return (
    <div className="container mt-5">
      <h2>Games</h2>
      
      <div className="mt-3">
        <button className="btn btn-primary mb-2" onClick={startKillerMode}>
          KILLER
        </button>
        <p>
          Each player chooses a random number by shooting at the board. Hit a double of your number to become a "killer" and try to "kill" your opponents by hitting doubles of their numbers. Each player gets three lives. The last player standing wins!
        </p>
      </div>

      <div className="mt-3">
        <button className="btn btn-primary mb-2" onClick={startKillerMode}>
          Around the World!
        </button>
        <p>
          Score 1-20 in order to win! If you miss, you have to start over.
        </p>
      </div>

      <div className="mt-3">
        <button className="btn btn-primary mb-2" onClick={startKillerMode}>
          Shotgun
        </button>
        <p>
          A random number is chosen. The player who hits the number gets to pick the person to shotgun a drink.
        </p>
      </div>
    </div>
  );
}

export default PartyModesPage;
