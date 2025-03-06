import React, { useEffect } from "react";
import { FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router";

const linkedinClientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const REDIRECT_URI = encodeURIComponent(`${window.location.origin}/linkedin/callback`);

const LinkedInAuthButton = () => {
  const navigate = useNavigate();
  
  // Generate secure random state
  const generateState = () => {
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => dec.toString(16)).join('');
  };

  const handleLogin = () => {
    const state = generateState();
    localStorage.setItem("linkedin_oauth_state", state);
    
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedinClientId}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=openid%20profile%20email`;
    window.location.href = authUrl;
  };

  // Handle callback logic in your router component
  useEffect(() => {
    if (window.location.pathname === "/linkedin/callback") {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");
      const error = params.get("error");

      if (error) {
        navigate("/login?error=linkedin_failed");
        return;
      }

      if (code && state === localStorage.getItem("linkedin_oauth_state")) {
        // Send code to backend
        fetch("/api/auth/linkedin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        })
          .then(response => response.json())
          .then(data => {
            localStorage.setItem("authToken", data.access_token);
            navigate("/dashboard");
          })
          .catch(() => navigate("/login?error=auth_failed"));
      }
    }
  }, [navigate]);

  return (
    <button
      onClick={handleLogin}
      className="w-full h-11 flex items-center justify-center gap-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
    >
      <FaLinkedin className="text-blue-600 text-xl mr-2" />
      <span className="text-gray-700 font-medium">Sign in with LinkedIn</span>
    </button>
  );
};

export default LinkedInAuthButton;