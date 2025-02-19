import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { LinkedIn } from "react-linkedin-login-oauth2";

const LinkedInAuthButton = () => {
  const handleSuccess = (response: any) => {
    console.log("LinkedIn Auth Success:", response);
    // You can send this authorization code to your backend for further processing
  };

  const handleError = (error: any) => {
    console.error("LinkedIn Auth Failed:", error);
  };

  return (
    <LinkedIn
      clientId="77fzfa1dhch0j9"
      redirectUri="http://localhost:8080"
      onSuccess={handleSuccess}
      onError={handleError}
      scope="email"
      state="124313" // A random state value for security
    >
      {({ linkedInLogin }) => (
        <button
          onClick={linkedInLogin}
          className="flex items-center justify-center w-64 h-10 border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-100 transition"
        >
          <FaLinkedin className="text-blue-600 text-xl mr-2" />
          Sign in with LinkedIn
        </button>
      )}
    </LinkedIn>
  );
};

export default LinkedInAuthButton;
