import React from 'react';
import { Link } from 'react-router';

type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
};

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        <Link to="/" className="flex items-center text-xl font-bold">
          <img src="/assets/logo.svg" alt="logo" className="h-7 w-auto" loading="lazy" />
        </Link>
      </div>
      
      <div className="flex flex-1 flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {title && (
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-2 text-center text-sm text-gray-600">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 