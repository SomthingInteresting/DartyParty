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
      <button className="btn btn-primary mt-3" onClick={startKillerMode}>
        KILLER
      </button>
      <button className="btn btn-primary mt-3" onClick={startKillerMode}>
        Around the World!
      </button>
      <button className="btn btn-primary mt-3" onClick={startKillerMode}>
        Shotgun
      </button>
    </div>
  );
}

export default PartyModesPage;
