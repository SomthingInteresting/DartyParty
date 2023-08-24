import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PlayGamePage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Memoize the initialPlayers so it's not re-computed on every render
  const initialPlayers = useMemo(() => {
    return location.state?.players || [];
  }, [location.state]);

  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [darts, setDarts] = useState({ dart1: '', dart2: '', dart3: '' });
  const [gameMessage, setGameMessage] = useState('');  // New state variable for the game message

  const handleDartChange = (event) => {
    const { name, value } = event.target;
    setDarts(prevDarts => ({ ...prevDarts, [name]: value }));
  };

  const isValidScore = (dartScores) => {
    if (dartScores.some(score => score > 60 || score < 0)) {
        setGameMessage('Invalid score! A single dart score cannot exceed 60 or be negative.');
        return false;
    }
    if (dartScores.some(isNaN)) {
        setGameMessage('Please enter valid numbers for dart scores.');
        return false;
    }
    return true;
  };

  const updatePlayerScore = (dartScores) => {
    const totalScore = dartScores.reduce((acc, score) => acc + score, 0);
    const updatedPlayers = [...players];
    const currentPlayerScore = updatedPlayers[currentPlayerIndex].score;
    
    const newScore = currentPlayerScore - totalScore;

    if (newScore < 0) {
        setGameMessage('Score below zero! Turn voided.');
        return;
    } else if (newScore === 0) {
        const lastDart = dartScores[dartScores.length - 1];
        if (lastDart < 2 || (lastDart % 2 !== 0)) {
            setGameMessage('To win, the last dart must be a double!');
            return;
        } else {
            setGameMessage(`${updatedPlayers[currentPlayerIndex].name} wins!`);
            navigate('/');
            return;
        }
    }
    
    updatedPlayers[currentPlayerIndex].score = newScore;
    setPlayers(updatedPlayers);
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    setDarts({ dart1: '', dart2: '', dart3: '' });
  };

  const submitScore = () => {
    const dartScores = Object.values(darts).map(Number);
    if (isValidScore(dartScores)) {
      updatePlayerScore(dartScores);
    }
  };

  useEffect(() => {
    if (!initialPlayers.length) navigate('/');
  }, [initialPlayers, navigate]);

  return (
    <div className="container mt-5">
      {gameMessage && <div className="alert alert-info">{gameMessage}</div>}  {/* Display the game message */}
      <h2>{players[currentPlayerIndex]?.name}</h2>
      <p>Current Score: {players[currentPlayerIndex]?.score}</p>
      <DartInputs darts={darts} onChange={handleDartChange} />
      <div className="mt-3">
        <button className="btn btn-primary" onClick={submitScore}>Submit Score</button>
        <button className="btn btn-secondary ms-2" onClick={() => navigate('/')}>Go to Homepage</button>
        <button className="btn btn-danger ms-2" onClick={() => setCurrentPlayerIndex(0)}>Restart Game</button>
      </div>
    </div>
  );
}

const DartInputs = ({ darts, onChange }) => (
  <div className="row mt-3">
    {["dart1", "dart2", "dart3"].map(dart => (
      <div className="col-md-4" key={dart}>
        <input
          className="form-control"
          name={dart}
          value={darts[dart]}
          onChange={onChange}
          placeholder={`Dart ${dart.charAt(4)}`}
        />
      </div>
    ))}
  </div>
);

export default PlayGamePage;
