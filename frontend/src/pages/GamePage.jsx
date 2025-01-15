// Game screen with image background

import { validateClick, postScores } from '../utils/api';
import { useState, useEffect } from 'react';
import { useTimer } from '../context/TimerContext';
import { useNavigate } from 'react-router-dom';
import TargetingBox from '../components/TargetingBox';
import Timer from '../components/Timer';
import Marker from '../components/Marker';
import HighScoreForm from '../components/HighScoreForm';
import illustration from '../assets/waldo-illustration.jpeg';
import '../styles/gamePage.css';

const GamePage = () => {
  const [clickPosition, setClickPosition] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const { startTimer, stopTimer, resetTimer, elapsedTime } = useTimer();
  const navigate = useNavigate();

  useEffect(() => {
    resetTimer();
    startTimer();

    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleCharacterSelect = async (character) => {
    const response = await validateClick(clickPosition.x, clickPosition.y, character);

    if (response.success) {
      setCorrectGuesses((prev) => [...prev, { name: character, ...clickPosition }]);
    } else {
      alert(response.message);
    }

    if (correctGuesses.length + 1 === 3) {
      stopTimer();
      setGameCompleted(true);
    }

    setClickPosition(null);
  };

  const handleScoreSubmit = async (playerName) => {
    try {
      const response = await postScores(playerName, elapsedTime);
      if (response.success) {
        navigate('/high-scores'); 
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error('Error submitting score:', error);
      alert('Failed to submit score. Please try again.');
    }
  };

  return (
    <div className="game-container">
      {!gameCompleted ? (
        <div className="image-wrapper" onClick={handleImageClick}>
          <Timer />
          <img src={illustration} alt="Where's Waldo?" className="game-image" />
          {clickPosition && (
            <TargetingBox
              x={clickPosition.x}
              y={clickPosition.y}
              onCharacterSelect={handleCharacterSelect}
            />
          )}
          {correctGuesses.map((guess, index) => (
            <Marker key={index} x={guess.x} y={guess.y} name={guess.name} />
          ))}
        </div>
      ) : (
        <div className="high-score-wrapper">
          <h1>Congratulations! You&apos;ve found all characters!</h1>
          <p>Your time: {elapsedTime} seconds</p>
          <HighScoreForm onSubmit={handleScoreSubmit} />
        </div>
      )}
    </div>
  );
};

export default GamePage;
