import { lazy } from 'react';
const SigninForm = lazy(
  () => import('@/modules/auth/signin/components/signinForm')
);
import { ToastContainer } from 'react-toastify';
import QueryClient from '@/modules/shared/components/ReactQueryProvider';

export default function SignIn() {
  return (
    <QueryClient>
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
      <div className="min-h-screen bg-white">
        <SigninForm />
      </div>
    </QueryClient>
  );
}
