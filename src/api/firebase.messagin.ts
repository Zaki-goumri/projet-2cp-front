import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseApp } from './firebase.config';
import axios from '@/api/axios.config';

const messaging = getMessaging(firebaseApp);

export const requestFcmToken = async () => {
  try {
    const vapidKey = 'BHi08OMiEDnghewVmkhpbfwEh8UCTV4XA1Ay46pOVY-uYEo0jphBhG_vk9AsaKt1o7WkpaCs7TIaai_3D2ydYqU';
    const token = await getToken(messaging, { vapidKey });
    if (token) {   
      console.log('fmc', token);
      const response = await axios.post('/Auth/Fcm', { token });
      console.log(response.data);
      return token;
    } else {
      console.warn('No registration token available.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token.', err);
  }
};
