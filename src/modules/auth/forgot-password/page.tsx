import { Link } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import React, { lazy } from 'react';

const ForgotPasswordForm = lazy(
  () =>
    import(
      '@/modules/auth/forgot-password/components/forgotPasswordForm'
    )
);
const queryClient = new QueryClient();

const ForgotPassword = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen w-full">
        <ToastContainer />
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#98E9AB]/20 via-[#98E9AB]/30 to-[#98E9AB]/40 px-4 py-8 sm:px-6 lg:px-8">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
            <div className="relative p-6 sm:p-8">
              {/* Logo and decorative elements */}
              <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-[#98E9AB] to-[#7ED196]"></div>
              <div className="mb-8 flex justify-center">
                <img src="/assets/logo.svg" alt="Logo" className="h-8 w-auto" />
              </div>

              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  Forgot Password?
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600 sm:text-base">
                  Enter your email address and we'll send you a code to reset
                  your password
                </p>
              </div>

              {/* Form */}
              <div className="mt-8">
                <ForgotPasswordForm />
              </div>

              {/* Back to login link */}
              <div className="mt-6 flex items-center justify-center">
                <Link
                  to="/auth/signin"
                  className="text-sm text-gray-600 transition-colors duration-200 hover:text-gray-900"
                >
                  ← Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </QueryClientProvider>
  );
};

export default ForgotPassword;
