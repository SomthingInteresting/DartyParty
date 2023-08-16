import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PlayGamePage() {
  const location = useLocation();
  const navigate = useNavigate();

  console.log("Full location object:", location);
  
  // Memoize the initialPlayers so it's not re-computed on every render
  const initialPlayers = useMemo(() => {
    return location.state?.players || [];
  }, [location.state]);

  console.log("Received players:", initialPlayers);

  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [darts, setDarts] = useState({ dart1: '', dart2: '', dart3: '' });

  const handleDartChange = (event) => {
    setDarts({
      ...darts,
      [event.target.name]: event.target.value,
    });
  };

  const submitScore = () => {
    const dartScores = Object.values(darts).map(Number);

    // 1. Check if any dart score exceeds 60
    if (dartScores.some(score => score > 60 || score < 0)) {
        alert('Invalid score! A single dart score cannot exceed 60 or be negative.');
        return;
    }

    // 2. Check if scores are valid numbers
    if (dartScores.some(isNaN)) {
        alert('Please enter valid numbers for dart scores.');
        return;
    }

    const totalScore = dartScores.reduce((acc, score) => acc + score, 0);
    const updatedPlayers = [...players];
    const currentPlayerScore = updatedPlayers[currentPlayerIndex].score;
    
    const newScore = currentPlayerScore - totalScore;

    if (newScore < 0) {
        alert('Score below zero! Turn voided.');
        return;
    } else if (newScore === 0) {
        // 3. Check winning condition, the last dart must be a double
        const lastDart = dartScores[dartScores.length - 1];
        if (lastDart < 2 || (lastDart % 2 !== 0)) {
            alert('To win, the last dart must be a double!');
            return;
        } else {
            alert(`${updatedPlayers[currentPlayerIndex].name} wins!`);
            navigate('/');
            return;
        }
    }
    
    updatedPlayers[currentPlayerIndex].score = newScore;

    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    setDarts({ dart1: '', dart2: '', dart3: '' });
    setPlayers(updatedPlayers);
};

  useEffect(() => {
    // Reset the game state if no players are provided
    if (!initialPlayers.length) {
      navigate('/');
    }
  }, [initialPlayers, navigate]);

  return (
    <div className="container mt-5">
      <h2>{players[currentPlayerIndex]?.name}</h2> 
      <p>Current Score: {players[currentPlayerIndex]?.score}</p>
      <div className="row mt-3">
        <div className="col-md-4">
          <input 
            className="form-control" 
            name="dart1" 
            value={darts.dart1} 
            onChange={handleDartChange} 
            placeholder="Dart 1" 
          />
        </div>
        <div className="col-md-4">
          <input 
            className="form-control" 
            name="dart2" 
            value={darts.dart2} 
            onChange={handleDartChange} 
            placeholder="Dart 2" 
          />
        </div>
        <div className="col-md-4">
          <input 
            className="form-control" 
            name="dart3" 
            value={darts.dart3} 
            onChange={handleDartChange} 
            placeholder="Dart 3" 
          />
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={submitScore}>Submit Score</button>
      <button className="btn btn-secondary mt-3 ms-2" onClick={() => navigate('/')}>Go to Homepage</button>
      <button className="btn btn-danger mt-3 ms-2" onClick={() => setCurrentPlayerIndex(0)}>Restart Game</button>
    </div>
  );
}

export default PlayGamePage;
