import React, { useState } from "react";
import { X, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router";
const Linkedin = React.lazy(
  () => import("@/modules/features/auth/signin/components/linkedinButtton"),
);

const Google = React.lazy(
  () => import("@/modules/features/auth/signin/components/googleButton"),
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isEmailView, setIsEmailView] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt made");
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-hidden">
      <div className="bg-white rounded-3xl w-full max-w-md relative animate-fadeIn overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Green Header */}
        {/* <div className="bg-primary h-32 relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_120%,rgba(120,190,140,0.46),rgba(255,255,255,0))]" />
        </div> */}

        {/* Content Section */}
        <div className="px-8 pb-8 -mt-16">
          {/* Logo or Icon */}
          <div className="w-20 h-20 bg-white rounded-2xl mt-28 shadow-md flex items-center justify-center mb-6 mx-auto">
            <Mail className="w-10 h-10 text-primary" />
          </div>

          {!isEmailView ? (
            <>
              {/* Initial View */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600">
                  Sign in to access internship opportunities
                </p>
              </div>

              <div className="space-y-4 flex flex-col justify-center items-center">
                <Linkedin />
                <Google />
                <button
                  className="w-full h-11 flex items-center justify-center gap-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => setIsEmailView(true)}
                >
                  <Mail className="text-xl mr-2" />
                  <p className="text-gray-700 font-medium"
                  >Continue with Email</p>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Email Login View */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
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
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3.5 px-4 rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 mt-6"
                >
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsEmailView(false)}
                  className="w-full text-center text-sm text-gray-600 hover:text-gray-900 mt-4"
                >
                  ← Back to all options
                </button>
              </form>
            </>
          )}

          {/* Terms */}
          <p className="text-xs text-gray-500 text-center mt-8">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
          <p className="text-xs text-gray-500 text-center mt-4">
            Don't have an account?{" "}
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
