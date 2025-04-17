import React from 'react';
import { ToastContainer } from 'react-toastify';
import NavBar from '../../modules/shared/components/navBar';

type LayoutProps = {
  children: React.ReactNode;
};

export const LayoutWithoutFooter = ({ children }: LayoutProps) => (
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
  </>
);

export default LayoutWithoutFooter; 