import React, { useState } from 'react';
import { X, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
const Linkedin = React.lazy(
  () => import('@/modules/features/auth/signin/components/linkedinButtton')
);

const Google = React.lazy(
  () => import('@/modules/features/auth/signin/components/googleButton')
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isEmailView, setIsEmailView] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt made');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/60 p-4 backdrop-blur-sm">
      <div className="animate-fadeIn relative w-full max-w-md overflow-hidden rounded-3xl bg-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-gray-400 transition-colors hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Green Header */}
        {/* <div className="bg-primary h-32 relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(120,190,140,0.46),rgba(255,255,255,0))]" />
        </div> */}

        {/* Content Section */}
        <div className="-mt-16 px-8 pb-8">
          {/* Logo or Icon */}
          <div className="mx-auto mt-28 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-md">
            <Mail className="text-primary h-10 w-10" />
          </div>

          {!isEmailView ? (
            <>
              {/* Initial View */}
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  Welcome Back
                </h2>
                <p className="text-gray-600">
                  Sign in to access internship opportunities
                </p>
              </div>

              <div className="flex flex-col items-center justify-center space-y-4">
                <Linkedin />
                <Google />
                <button
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-gray-200 transition-colors hover:bg-gray-50"
                  onClick={() => setIsEmailView(true)}
                >
                  <Mail className="mr-2 text-xl" />
                  <p className="font-medium text-gray-700">
                    Continue with Email
                  </p>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Email Login View */}
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  Sign in with Email
                </h2>
                <p className="text-gray-600">
                  Enter your email and password to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:ring-1"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:border-primary focus:ring-primary w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:ring-1"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-white transition-colors"
                >
                  Sign In
                  <ArrowRight className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsEmailView(false)}
                  className="mt-4 w-full text-center text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to all options
                </button>
              </form>
            </>
          )}

          {/* Terms */}
          <p className="mt-8 text-center text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
          <p className="mt-4 text-center text-xs text-gray-500">
            Don't have an account?{' '}
            <Link to="/auth/signin" className="text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
