// Functions for API calls (validate user guess and fetch high scores)

const API_URL = 'http://localhost:3000';

export const validateClick = async (clickX, clickY, characterName) => {
  try {
    const response = await fetch(`${API_URL}/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ clickX, clickY, characterName }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to validate click');
    }

    return await response.json();
  } catch (err) {
    console.error('Error validating click', err);
    return { success: false, message: 'Error occurred while validating click' }
  }
};

export const getScores = async () => {
  try {
    const response = await fetch(`${API_URL}/scores`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch scores');
    }
    
    return await response.json();
  } catch (err) {
    console.error('Error fetching scores:', err);
    return { success: false, message: 'Error occurred while fetching scores' };
  }
};

export const postScores = async (playerName, time) => {
  try {
    const response = await fetch(`${API_URL}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({ playerName, time }),
    });

    if (!response.ok) {
      throw new Error('Failed to post score');
    }
    
    return await response.json();
  } catch (err) {
    console.error('Error posting score:', err);
    return { success: false, message: 'Error occurred while posting score' };
  }
};