import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ChooseGamePage() {
  const [players, setPlayers] = useState(['', '']);
  const [game, setGame] = useState('201');
  const navigate = useNavigate();

  const handlePlayerChange = (index, event) => {
    const newPlayers = [...players];
    newPlayers[index] = event.target.value;
    setPlayers(newPlayers);
  }

  const addAnotherPlayer = () => {
    setPlayers([...players, '']);
  };

  const isValidGameSetup = () => {
    return players.every(p => p.trim());
  };

  const startGame = () => {
    if (isValidGameSetup()) {
      const playerData = players.map(name => ({ name, score: parseInt(game) }));
      navigate('/play', { state: { players: playerData } });
    } else {
      alert("Please ensure all player names are filled in.");
    }
  };

  return (
    <div className="container mt-5">
      <GameSelector selectedGame={game} onChange={setGame} />
      <PlayerInputs players={players} onChange={handlePlayerChange} />
      <button className="btn btn-secondary mt-3" onClick={addAnotherPlayer}>Add another player</button>
      <button 
        className="btn btn-primary mt-3"
        onClick={startGame}
        disabled={!isValidGameSetup()}
      >
        Start Game
      </button>
    </div>
  );
}

const GameSelector = ({ selectedGame, onChange }) => (
  <>
    <h2>Choose game:</h2>
    <select className="form-select" value={selectedGame} onChange={(e) => onChange(e.target.value)}>
      <option value="201">201</option>
      <option value="501">501</option>
    </select>
  </>
);

const PlayerInputs = ({ players, onChange }) => (
  <div className="mt-3">
    {players.map((player, index) => (
      <div className="mb-2" key={index}>
        <input 
          className="form-control"
          placeholder={`Player ${index + 1} Name`} 
          value={player}
          onChange={(e) => onChange(index, e)}
        />
      </div>
    ))}
  </div>
);

export default ChooseGamePage;
