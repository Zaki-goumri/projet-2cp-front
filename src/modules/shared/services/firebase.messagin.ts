import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseApp } from '@/api/firebase.config';

const messaging = getMessaging(firebaseApp);

export const requestFcmToken = async () => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
    });

    if (currentToken) {
      console.log('Current token:', currentToken);
      return currentToken;
    } else {
      console.log('No registration token available.');
      return null;
    }
  } catch (error) {
    console.error('An error occurred while retrieving token:', error);
    return null;
  }
}; 