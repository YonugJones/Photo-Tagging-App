// Game screen with image background

import { validateClick } from '../utils/api';
import { useState } from 'react';
import TargetingBox from '../components/TargetingBox';
import Marker from '../components/Marker';
import illustration from '../assets/waldo-illustration.jpeg';
import '../styles/gamePage.css';

const GamePage = () => {
  const [clickPosition, setClickPosition] = useState(null);
  const [correctGuesses, setCorrectGuesses] = useState([])

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleCharacterSelect = async (character) => {
    console.log('Selected character:', character);
    console.log('Coordinate:', clickPosition);

    const response = await validateClick(clickPosition.x, clickPosition.y, character);

    if (response.success) {
      setCorrectGuesses((prev) => [...prev, { name: character, ...clickPosition }]);
    } else {
      alert(response.message);
    }

    setClickPosition(null);
  }

  return (
    <div className='game-container' onClick={handleImageClick}>
      <img src={illustration} alt='Where&apos;s Waldo?' className='game-image' />
      {clickPosition && (
        <TargetingBox x={clickPosition.x} y={clickPosition.y} onCharacterSelect={handleCharacterSelect} />
      )}
      {correctGuesses.map((guess, index) => (
        // TO DO: create Marker component
        <Marker key={index} x={guess.x} y={guess.y} name={guess.name} />
      ))}
    </div>
  )
}

export default GamePage;