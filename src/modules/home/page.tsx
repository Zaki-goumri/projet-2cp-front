/* eslint-disable prettier/prettier */
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const AuthedHome = React.lazy(() => import('@/modules/home/Authedhome/page'));
const UnAuthedHome = React.lazy(
  () => import('@/modules/home/unAuthedhome/page')
);
import { useUserStore } from '../shared/store/userStore';
import { useEffect } from 'react';
import { requestFcmToken } from '@/api/firebase.messagin';

const queryClient = new QueryClient();

const HomaPage = () => {
  const user = useUserStore((state) => state.user);

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
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        {user ? <AuthedHome /> : <UnAuthedHome />}
      </div>
    </QueryClientProvider>
  );
};
export default HomaPage;
