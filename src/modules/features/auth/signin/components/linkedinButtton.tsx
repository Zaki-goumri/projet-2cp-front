import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { LinkedIn } from "react-linkedin-login-oauth2";

const LinkedInAuthButton = () => {
  const handleSuccess = (response: any) => {
    console.log("LinkedIn Auth Success:", response);
    // You can send this authorization code to your backend for further processing
  };

  const handleFailure = (error: any) => {
    console.error("LinkedIn Auth Failed:", error);
  };

  return (
    <LinkedIn
      clientId="YOUR_LINKEDIN_CLIENT_ID"
      redirectUri="http://localhost:8080/auth/linkedin/callback"
      onSuccess={handleSuccess}
      onError={handleFailure}
      scope="r_liteprofile r_emailaddress"
      state="123456" // A random state value for security
    >
      {({ linkedInLogin }) => (
        <button
          onClick={linkedInLogin}
        className="flex items-center justify-center w-64 h-10 border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-100 transition"
        >
          <FaLinkedin size={20} 
          // className ="text-blue-600 text-xl mr-2" 
          />
          <span className="text-gray-700 font-medium">Sign in with LinkedIn</span>
        </button>
      )}
    </LinkedIn>
  );
};

export default LinkedInAuthButton;
