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

  const startGame = () => {
    const playerData = players.map(name => ({ name, score: parseInt(game) }));
    console.log("Players to be passed:", playerData);
    navigate('/play', { state: { players: playerData } });
  };

    return (
        <div className="container mt-5">
            <h2>Choose game:</h2>

            <select className="form-select" value={game} onChange={(e) => setGame(e.target.value)}>
                <option value="201">201</option>
                <option value="501">501</option>
            </select>

            <div className="mt-3">
                {players.map((player, index) => (
                    <div className="mb-2" key={index}>
                        <input 
                            className="form-control"
                            placeholder={`Player ${index + 1} Name`} 
                            value={player}
                            onChange={(e) => handlePlayerChange(index, e)}
                        />
                    </div>
                ))}
            </div>

            <button 
                className="btn btn-primary mt-3" 
                disabled={players.some(p => !p.trim())} 
                onClick={startGame}
            >
                Start Game
            </button>
        </div>
    );
}

export default ChooseGamePage;
