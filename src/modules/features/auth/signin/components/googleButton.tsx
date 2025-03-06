import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";


 const googleOAuthId = import.meta.env.VITE_GOOGLE_OAUTH_ID;
 
const GoogleSignInButton = () => {
  const navigate = useNavigate();
   const login = useGoogleLogin({
    flow: "auth-code",
    redirect_uri: window.location.origin + "/google/callback", 
    ux_mode: "redirect",
  });

  return (
    <button
      onClick={() => login()}
      className="w-full h-11 flex items-center justify-center gap-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
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