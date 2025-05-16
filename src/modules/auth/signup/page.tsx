import { lazy } from 'react';
const SignUpForm = lazy(() => import('./components/signupForm'));
import { ToastContainer } from 'react-toastify';

export default function SignUp() {
  return (
    <>
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
        <SignUpForm />
      </div>
    </>
  );
}
