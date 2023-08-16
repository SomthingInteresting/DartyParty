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

  const handleDartChange = (event) => {
    const { name, value } = event.target;
    setDarts(prevDarts => ({ ...prevDarts, [name]: value }));
  };

  const isValidScore = (dartScores) => {
    // 1. Check if any dart score exceeds 60
    if (dartScores.some(score => score > 60 || score < 0)) {
        alert('Invalid score! A single dart score cannot exceed 60 or be negative.');
        return false;
    }

    // 2. Check if scores are valid numbers
    if (dartScores.some(isNaN)) {
        alert('Please enter valid numbers for dart scores.');
        return false;
    }

    return true;
  };

  const displayTripleMessage = (dartScores) => {
    const tripleScores = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60];
    if (dartScores.some(score => tripleScores.includes(score))) {
        alert('Oooh baby a triple!');
    }
  };

  const updatePlayerScore = (dartScores) => {
    const totalScore = dartScores.reduce((acc, score) => acc + score, 0);
    const updatedPlayers = [...players];
    const currentPlayerScore = updatedPlayers[currentPlayerIndex].score;
    
    const newScore = currentPlayerScore - totalScore;

    if (newScore < 0) {
        alert('Score below zero! Turn voided.');
        return;
    } else if (newScore === 0) {
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
    setPlayers(updatedPlayers);
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    setDarts({ dart1: '', dart2: '', dart3: '' });
  };

  const submitScore = () => {
    const dartScores = Object.values(darts).map(Number);
    if (isValidScore(dartScores)) {
      displayTripleMessage(dartScores);
      updatePlayerScore(dartScores);
    }
  };

  useEffect(() => {
    if (!initialPlayers.length) navigate('/');
  }, [initialPlayers, navigate]);

  return (
    <div className="container mt-5">
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
