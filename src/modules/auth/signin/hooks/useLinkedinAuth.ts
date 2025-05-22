import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serialize } from 'cookie';
import { baseUrl } from '@/api/axios.config';
import { requestFcmToken } from '@/api/firebase.messaging';
interface LinkedInTokenResponse {
  access_token: string;
  expires_in: number;
}

interface LinkedInAuthResult {
  isLoading: boolean;
  error: string | null;
  debugInfo: any;
}

interface LinkedInAuthParams {
  code: string;
  state: string;
  storedState: string | null;
}

const exchangeCodeForToken = async (
  code: string
): Promise<LinkedInTokenResponse> => {
  console.log('Exchanging code for token:', code.substring(0, 10) + '...');
  return {
    access_token: code,
    expires_in: 3600,
  };
};

const authenticateWithBackend = async (accessToken: string) => {
  console.log('Sending access token to backend:', `${baseUrl}/Auth/linkedin`);
  const response = await axios.post(`${baseUrl}/Auth/linkedin`, {
    access_token: accessToken,
  });
  return response.data;
};

export const useLinkedinAuth = (): LinkedInAuthResult => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async ({ code, state, storedState }: LinkedInAuthParams) => {
      if (!state || state !== storedState) {
        throw new Error('State validation failed');
      }

      localStorage.removeItem('linkedin_state');

      const tokenResponse = await exchangeCodeForToken(code);

      return authenticateWithBackend(tokenResponse.access_token);
    },
    onSuccess: (data) => {
      document.cookie = serialize('accessToken', data.access, {
        httpOnly: false,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        path: '/',
      });

      document.cookie = serialize('refreshToken', data.refresh, {
        httpOnly: false,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        path: '/',
      });
      requestFcmToken();
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    },
    onError: (error) => {
      console.error('LinkedIn Authentication failed:', error);
      setTimeout(() => {
        navigate('/auth/signin?error=linkedin_failed');
      }, 5000);
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const storedState = localStorage.getItem('linkedin_state');

    if (code && state) {
      mutation.mutate({ code, state, storedState });
    } else if (window.location.pathname.includes('/auth/linkedin/callback')) {
      mutation.reset();
      navigate('/auth/signin?error=missing_params');
    }
  }, [navigate, mutation]);

  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  const state = params.get('state');
  const storedState = localStorage.getItem('linkedin_state');

  const debugInfo = {
    code: code?.substring(0, 10) + '...',
    state: state || undefined,
    storedState: storedState || undefined,
    stateMatch: state === storedState,
    mutationStatus: mutation.status,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error ? String(mutation.error) : null,
    data: mutation.data,
    cookies: document.cookie,
  };

  return {
    isLoading: mutation.isPending,
    error: mutation.error ? String(mutation.error) : null,
    debugInfo,
  };
};

export default useLinkedinAuth;

