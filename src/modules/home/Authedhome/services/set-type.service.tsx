import axios from '@/api/axios.config';

export const setType = async (type: string) => {
  try {
    const response = await axios.put('/Auth/usertype', { type });
    if (response.status !== 200) {
      throw new Error('Failed to set user type');
    }
    console.log('User type set successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error setting user type:', error);
    throw error;
  }
};
