// High score leaderboard screen
import { useState, useEffect } from 'react';
import { getScores, postScores } from '../utils/api';
import HighScoreForm from '../components/HighScoreForm';


export const HighScorePage = () => {
  const [scores, setScores] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      const response = await getScores();
      if (response.success) {
        setScores(response.data);
      }
    };
    fetchScores();
  }, []);

  const handleSubmitScore = async (playerName, time) => {
    const response = await postScores(playerName, time);
    if (response.sucess) {
      setScores((prev) => [...prev, response.data]);
      setShowForm(false)
    } else {
      alert(response.message);
    }
  }

  return (
    <div className='high-score-page'>
      <h1>High Scores</h1>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>
            {score.playerName}: {score.time}s
          </li>
        ))}
      </ul>
      {showForm ? (
        // ToDO: create high score form
        <HighScoreForm onSubmit={handleSubmitScore} />
      ) : (
        <butto onClick={() => setShowForm(true)}>Add Your Score</button>
      )}
    </div>
  )
}