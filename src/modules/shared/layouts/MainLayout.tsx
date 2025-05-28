import { ToastContainer } from 'react-toastify';
import { NavBar, Footer } from '@/modules/shared/components';
import { ReactNode, useEffect } from 'react';
import { requestFcmToken } from '@/api/firebase.messaging';

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('firebase-messaging-sw.js')
        .then(() => {
          requestFcmToken();
        })
        .catch((err) => console.error('SW registration failed:', err));
    }
  }, []);

  return (
    <>
      <NavBar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
