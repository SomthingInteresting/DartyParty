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
      <h2>Killer Mode</h2>
      {gameMessage && <div className="alert alert-warning">{gameMessage}</div>}

      {!gameStarted ? (
        <div>
          {players.map((player, index) => (
            <div key={index}>
              <input 
                type="text" 
                placeholder={`Player ${index + 1} Name`} 
                value={player.name}
                onChange={(e) => handleNameChange(index, e)}
              />
            </div>
          ))}
          <button onClick={addNewPlayer}>Add another player</button>
          <button onClick={startGame}>Start Game</button>
        </div>
      ) : (
        <div className="players-list">
          {players.map((player, index) => (
            <div key={index}>
              <h3>{player.name}</h3>
              <p>Number: {player.number}</p>
              <p>Lives: {player.lives}</p>
              <p>{player.isKiller ? 'Is a Killer!' : 'Not a Killer'}</p>
              
              <button onClick={() => handleNumberSelection(index, Math.floor(Math.random() * 20) + 1)}>
                Choose Random Number
              </button>

              <button onClick={() => handleBecomeKiller(index)}>
                Become a Killer
              </button>

              {players.map((opponent, oppIndex) => (
                oppIndex !== index && player.isKiller ? (
                  <button key={oppIndex} onClick={() => handleKillOpponent(index, oppIndex)}>
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
