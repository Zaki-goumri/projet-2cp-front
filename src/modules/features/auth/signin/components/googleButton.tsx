import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { FcGoogle } from "react-icons/fc";

const GOOGLE_CLIENT_ID = "241487075785-ca4eq6d3642e5qasusc2342ndckimnar.apps.googleusercontent.com"; // Replace with your actual Google Client ID

const GoogleSignInButton = () => {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      
      console.log("Access Token:", tokenResponse);
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
        .then((res) => res.json())
        .then((user) => console.log("User Info:", user))
        .catch((err) => console.error("Error fetching user info:", err));
    },
    onError: () => console.error("Google login failed"),
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center w-64 h-10 border border-gray-300 rounded-full shadow-sm bg-white hover:bg-gray-100 transition"
    >
      <FcGoogle className=" text-xl mr-2" />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
};

const GoogleAuthProviderWrapper = () => (
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <GoogleSignInButton />
  </GoogleOAuthProvider>
);

export default GoogleAuthProviderWrapper;
