import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serialize } from 'cookie';
import { baseUrl } from '@/api/axios.config';
import { requestFcmToken } from '@/api/firebase.messaging';
interface GoogleTokenResponse {
  id_token: string;
  expires_in: number;
}

interface GoogleAuthResult {
  isLoading: boolean;
  error: string | null;
  debugInfo: any;
}

const exchangeCodeForToken = async (
  code: string
): Promise<GoogleTokenResponse> => {
  return {
    id_token: code,
    expires_in: 3600,
  };
};

const authenticateWithBackend = async (idToken: string) => {
  const response = await axios.post(`${baseUrl}/Auth/google`, {
    id_token: idToken,
  });
  return response.data;
};

export const useGoogleAuth = (): GoogleAuthResult => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (code: string) => {
      const tokenResponse = await exchangeCodeForToken(code);
      return authenticateWithBackend(tokenResponse.id_token);
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
      console.error('Google Authentication failed:', error);

      setTimeout(() => {
        navigate('/auth/signin?error=google_failed');
      }, 5000);
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      mutation.mutate(code);
    } else if (window.location.pathname.includes('/auth/google/callback')) {
      mutation.reset();
      navigate('/auth/signin?error=no_code');
    }
  }, [navigate, mutation]);

  const debugInfo = {
    code:
      new URLSearchParams(window.location.search)
        .get('code')
        ?.substring(0, 10) + '...',
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

export default useGoogleAuth;

