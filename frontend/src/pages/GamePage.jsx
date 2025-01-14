// Game screen with image background

import { validateClick } from '../utils/api';
import { useState, useEffect } from 'react';
import { useTimer } from '../context/TimerContext';
import TargetingBox from '../components/TargetingBox';
import Timer from '../components/Timer';
import Marker from '../components/Marker';
import illustration from '../assets/waldo-illustration.jpeg';
import '../styles/gamePage.css';

const GamePage = () => {
  const [clickPosition, setClickPosition] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const { startTimer, stopTimer, resetTimer } = useTimer();

  useEffect(() => {
    resetTimer();
    startTimer();

    return () => stopTimer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleImageClick = (e) => {

    const rect = e.target.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleCharacterSelect = async (character) => {

    console.log('Validating character selection...');

    const response = await validateClick(clickPosition.x, clickPosition.y, character);

    if (response.success) {
      setCorrectGuesses((prev) => [...prev, { name: character, ...clickPosition }]);
    } else {
      alert(response.message);
    }

    if (correctGuesses.length + 1 === 3) {
      console.log('All characters found, stopping timer');
      stopTimer();
    }

    setClickPosition(null);
  }

  return (
    <div className="game-container">
      <div className="image-wrapper" onClick={handleImageClick}>
        <Timer />
        <img src={illustration} alt="Where's Waldo?" className="game-image" />
        {clickPosition && (
          <TargetingBox x={clickPosition.x} y={clickPosition.y} onCharacterSelect={handleCharacterSelect} />
        )}
        {correctGuesses.map((guess, index) => (
          <Marker key={index} x={guess.x} y={guess.y} name={guess.name} />
        ))}
      </div>
    </div>
  );
}

export default GamePage;