// Game screen with image background

import { useState } from 'react';
import TargetingBox from '../components/TargetingBox';
import illustration from '../assets/waldo-illustration.jpeg';
import '../styles/gamePage.css';

const GamePage = () => {
  const [clickPosition, setClickPosition] = useState(null);

  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    setClickPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleCharacterSelect = (character) => {
    console.log('Selected character:', character);
    console.log('Coordinate:', clickPosition);
    // TODO validate user click with character position in DB
    setClickPosition(null);
  }

  return (
    <div className='game-container' onClick={handleImageClick}>
      <img src={illustration} alt='Where&apos;s Waldo?' className='game-image' />
      {clickPosition && (
        <TargetingBox x={clickPosition.x} y={clickPosition.y} onCharacterSelect={handleCharacterSelect} />
      )}
    </div>
  )
}

export default GamePage;