import { lazy, useEffect } from 'react';
import './index.css';
import { requestFcmToken } from '@/api/firebase.messagin';

const LandingPage = lazy(() => import('./modules/landingPage/page'));

const App = () => {
  // The vite-plugin-pwa handles SW registration automatically
  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/firebase-messaging-sw.js') // REMOVE THIS REGISTRATION
  //       .then(() => {
  //         // requestFcmToken(); // Consider when/where to request token now
  //       })
  //       .catch((err) => console.error('SW registration failed:', err));
  //   }
  // }, []);
  
  // TODO: Decide the appropriate place to call requestFcmToken().
  // It might need to be called after the PWA service worker is active 
  // or based on user login status, etc.
  useEffect(() => {
    // Example: Request token unconditionally on app load (review this logic)
     if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        // If SW is already active, request token
        requestFcmToken();
     } else if ('serviceWorker' in navigator) {
        // Listen for when the SW becomes active
        navigator.serviceWorker.ready.then((registration) => {
            console.log('PWA Service worker active', registration);
            requestFcmToken();
        });
     }
  }, []);

  return <LandingPage />;
};

export default App;
