import axios from 'axios';

export const getUserProfile = async () => {
  try {
    const response = await axios.get('/api/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}; 