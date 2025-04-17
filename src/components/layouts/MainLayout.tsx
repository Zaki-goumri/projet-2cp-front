import React from 'react';
import { ToastContainer } from 'react-toastify';
import NavBar from '../../modules/shared/components/navBar';
import { lazy } from 'react';

const Footer = lazy(() => import('../../modules/shared/components/footer'));

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => (
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

export default MainLayout; 