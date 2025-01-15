// High score leaderboard screen

import { useState, useEffect } from 'react';
import { getScores } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export const HighScorePage = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      const response = await getScores();
      if (response.success) {
        setScores(response.data);
      }
    };
    fetchScores();
  }, []);

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>High Scores</h1>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.playerName}: {score.time}s
          </li>
        ))}
      </ul>
      <button onClick={handlePlayAgain}>Play Again</button>
    </div>
  );
};

export default HighScorePage;
