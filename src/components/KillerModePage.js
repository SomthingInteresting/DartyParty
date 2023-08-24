// src/components/KillerModePage.js

import React, { useState } from 'react';

function KillerModePage() {
  const [players, setPlayers] = useState([
    { name: '', number: null, lives: 3, isKiller: false },
    { name: '', number: null, lives: 3, isKiller: false },
  ]);
  const [gameMessage, setGameMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const handleNumberSelection = (playerIndex, number) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].number = number;
    setPlayers(updatedPlayers);
  };

  const handleBecomeKiller = (playerIndex) => {
    const updatedPlayers = [...players];
    updatedPlayers[playerIndex].isKiller = true;
    setPlayers(updatedPlayers);
  };

  const handleKillOpponent = (killerIndex, opponentIndex) => {
    const updatedPlayers = [...players];
    if (updatedPlayers[killerIndex].isKiller && updatedPlayers[opponentIndex].lives > 0) {
      updatedPlayers[opponentIndex].lives -= 1;
      setPlayers(updatedPlayers);

      if (updatedPlayers[opponentIndex].lives === 0) {
        setGameMessage(`${updatedPlayers[killerIndex].name} You killed ${updatedPlayers[opponentIndex].name}, You win!`);
      }
    }
  };

  const handleNameChange = (index, event) => {
    const updatedPlayers = [...players];
    updatedPlayers[index].name = event.target.value;
    setPlayers(updatedPlayers);
  };

  const addNewPlayer = () => {
    setPlayers([...players, { name: '', number: null, lives: 3, isKiller: false }]);
  };

  const startGame = () => {
    if (players.every(player => player.name.trim())) {
      setGameStarted(true);
    } else {
      setGameMessage('Please ensure all player names are filled in.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>KILLER</h2>
      {gameMessage && <div className={`alert ${gameMessage.includes('win') ? 'alert-success' : 'alert-warning'}`}>{gameMessage}</div>}

      {!gameStarted ? (
        <div>
          {players.map((player, index) => (
            <div key={index} className="mb-3">
              <input 
                type="text" 
                className="form-control"
                placeholder={`Player ${index + 1} Name`} 
                value={player.name}
                onChange={(e) => handleNameChange(index, e)}
              />
            </div>
          ))}
          <button className="btn btn-primary me-2" onClick={addNewPlayer}>Add another player</button>
          <button className="btn btn-success" onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <div className="players-list">
          {players.map((player, index) => (
            <div key={index} className="mb-4">
              <h3>{player.name}</h3>
              <p>Number: {player.number}</p>
              <p>Lives: {player.lives}</p>
              <p>{player.isKiller ? 'Is a Killer!' : 'Not a Killer'}</p>
              
              <button className="btn btn-info me-2" onClick={() => handleNumberSelection(index, Math.floor(Math.random() * 20) + 1)}>
                Choose Random Number
              </button>

              <button className="btn btn-warning me-2" onClick={() => handleBecomeKiller(index)}>
                Become a Killer
              </button>

              {players.map((opponent, oppIndex) => (
                oppIndex !== index && player.isKiller ? (
                  <button key={oppIndex} className="btn btn-danger me-2" onClick={() => handleKillOpponent(index, oppIndex)}>
                    Kill {opponent.name}
                  </button>
                ) : null
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default KillerModePage;
