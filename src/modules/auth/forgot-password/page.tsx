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
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#98E9AB]/20 via-white to-[#98E9AB]/10 px-4 py-8">
          <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
            <div className="relative p-8">
              {/* Logo and decorative elements */}
              <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-[#98E9AB] to-[#7ED196]"></div>
              <div className="mb-8 flex justify-center">
                <img src="/assets/logo.svg" alt="Logo" className="h-10 w-auto" />
              </div>

              {/* Header */}
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  Reset your password
                </h1>
                <p className="mt-2 text-center text-sm text-gray-600">
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
                  className="text-sm font-medium text-[#98E9AB] hover:text-[#7ad98e] hover:underline"
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
