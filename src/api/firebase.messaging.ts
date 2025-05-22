import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseApp } from './firebase.config';
import axios from '@/api/axios.config';
import { toast } from 'react-toastify';
const messaging = getMessaging(firebaseApp);
onMessage(messaging, (payload) => {
  toast.error(payload?.notification?.body);
});
export const requestFcmToken = async () => {
  try {
    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
    const token = await getToken(messaging, { vapidKey });
    if (token) {
      const response = await axios.post('/Auth/Fcm', { token });
      return token;
    } else {
      console.warn('No registration token available.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token.', err);
  }
};
