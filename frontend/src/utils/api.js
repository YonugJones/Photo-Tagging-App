// Functions for API calls (validate user guess and fetch high scores)

const BASE_API = 'http://localhost:3000';

export const validateClick = async (clickX, clickY, characterName) => {
  try {
    const response = await fetch(`${BASE_API}/validate`, {
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