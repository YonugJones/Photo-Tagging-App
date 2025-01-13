// Game screen with image background
import '../styles/gamePage.css';
import illustration from '../assets/waldo-illustration.jpeg';

const GamePage = () => {
  return (
    <div className='game-container'>
      <img src={illustration} alt='Where&apos;s Waldo?' className='game-image' />
    </div>
  )
}

export default GamePage;