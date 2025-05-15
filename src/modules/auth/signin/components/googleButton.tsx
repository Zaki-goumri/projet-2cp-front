import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { GoogleIcon } from '@/modules/shared/icons';

const googleOAuthId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

const GoogleSignInButton = () => {
  const login = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: window.location.origin + '/google/callback',
    ux_mode: 'redirect',
  });

  return (
    <button
      onClick={() => login()}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-gray-200 transition-colors hover:bg-gray-50"
    >
      <GoogleIcon className="mr-2 h-5 w-5 text-gray-700" />
      <span className="font-medium text-gray-700">Sign in with Google</span>
    </button>
  );
};

const GoogleAuthProviderWrapper = () => (
  <GoogleOAuthProvider clientId={googleOAuthId}>
    <GoogleSignInButton />
  </GoogleOAuthProvider>
);

export default GoogleAuthProviderWrapper;
