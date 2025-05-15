import React, { useEffect } from 'react';
import { LinkedinIcon } from '@/modules/shared/icons';
import { useNavigate } from 'react-router';

const linkedinClientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
const REDIRECT_URI = encodeURIComponent(
  `${window.location.origin}/linkedin/callback`
);

const LinkedInAuthButton = () => {
  const navigate = useNavigate();

  const generateState = () => {
    const array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => dec.toString(16)).join('');
  };

  const handleLogin = () => {
    const state = generateState();
    localStorage.setItem('linkedin_oauth_state', state);
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${linkedinClientId}&redirect_uri=${REDIRECT_URI}&state=${state}&scope=openid%20profile%20email`;
    window.location.href = authUrl;
  };

  useEffect(() => {
    if (window.location.pathname === '/linkedin/callback') {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state');
      const error = params.get('error');

      if (error) {
        navigate('/auth/signin?error=linkedin_failed');
        return;
      }
      if (code && state === localStorage.getItem('linkedin_oauth_state')) {
        try {
          navigate('/dashboard');
        } catch (error) {
          navigate(`/auth/signin?error=auth_failed:${error}`);
        }
      }
    }
  }, [navigate]);

  return (
    <button
      onClick={handleLogin}
      className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-gray-200 transition-colors hover:bg-gray-50"
    >
      <LinkedinIcon className="mr-2 h-5 w-5 text-blue-600" />
      <span className="font-medium text-gray-700">Sign in with LinkedIn</span>
    </button>
  );
};

export default LinkedInAuthButton;
