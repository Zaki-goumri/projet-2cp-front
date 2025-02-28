import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useEffect } from "react";
import { useNavigate } from "react-router";


 const googleOAuthId = import.meta.env.VITE_GOOGLE_OAUTH_ID;
 
const GoogleSignInButton = () => {
  const navigate = useNavigate();
 

  
  // Configure for same-tab redirect
  const login = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: window.location.origin + "/oauth/callback", 
    ux_mode: "redirect", // Force full-page redirect
  });

  // Handle callback after Google redirects back
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (code) {
      // Exchange code for tokens here
      handleAuthentication(code);
    } else if (error) {
      navigate("/auth/signin?error=google_failed");
    }
  }, []);

  const handleAuthentication = async (code: string) => {
    try {
      // Send code to your backend for token exchange
      // const response = await fetch("/api/auth/google", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ code }),
      // });

      // const { user, token } = await response.json();
      
      // // Store tokens and redirect
      // localStorage.setItem("authToken", token);
      navigate("/home");
    } catch (err) {
      console.error("Authentication failed:", err);
      navigate("/auth/signin?error=auth_failed");
    }
  };

  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center w-64 h-10 border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-100 transition"
    >
      <FcGoogle className="text-xl mr-2" />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
};

const GoogleAuthProviderWrapper = () => (
  <GoogleOAuthProvider clientId={googleOAuthId}>
    <GoogleSignInButton />
  </GoogleOAuthProvider>
);

export default GoogleAuthProviderWrapper;