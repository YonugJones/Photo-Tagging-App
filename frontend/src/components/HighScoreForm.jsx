// Form to enter high score details

import { useState } from 'react'

export const HighScoreForm = ({ onSubmit }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName) {
      alert('Please enter your name');
      return;
    }
    onSubmit(playerName);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input 
          type='text' 
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        /> 
      </label>
      <button type='submit'>Submit Score</button>
    </form>
  )
}

export default HighScoreForm;