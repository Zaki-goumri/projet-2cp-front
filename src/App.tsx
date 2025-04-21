import { lazy } from 'react';
import './index.css';
import { requestFcmToken } from '@/api/firebase.messagin';
import { useEffect } from 'react';

const LandingPage = lazy(() => import('./modules/landingPage/page'));

const App = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(() => {
          requestFcmToken();
        })
        .catch((err) => console.error('SW registration failed:', err));
    }
  }, []);
  return <LandingPage />;
};

export default App;
