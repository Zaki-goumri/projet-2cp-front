import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { serialize } from 'cookie';
import { baseUrl } from '@/api/axios.config';

interface GoogleTokenResponse {
  id_token: string;
  expires_in: number;
}

interface DebugInfo {
  code?: string;
  tokenExchanged?: boolean;
  idTokenStart?: string;
  backendResponse?: boolean;
  responseData?: any;
  cookiesSet?: boolean;
  cookies?: string;
  backendError?: boolean;
  errorStatus?: number;
  errorData?: any;
  finalError?: string;
  stack?: string;
}

interface GoogleAuthResult {
  isLoading: boolean;
  error: string | null;
  debugInfo: DebugInfo;
}

export const useGoogleAuth = (): GoogleAuthResult => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({});

  useEffect(() => {
    const handleCallback = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        // Debug info
        setDebugInfo({
          code: code?.substring(0, 10) + '...',
        });
        
        if (!code) {
          throw new Error('Authorization code not found');
        }
        
        console.log('Google code received, simulating exchange for ID token');
        const tokenResponse = await exchangeCodeForToken(code);
        
        setDebugInfo(prev => ({ 
          ...prev, 
          tokenExchanged: true, 
          idTokenStart: tokenResponse.id_token.substring(0, 10) + '...' 
        }));
        
        // Send the ID token to your backend
        console.log('Sending ID token to backend:', `${baseUrl}/Auth/google`);
        
        try {
          // Log the structure we're sending
          const requestData = { id_token: tokenResponse.id_token };
          console.log('Request payload:', requestData);
          
          const response = await axios.post(`${baseUrl}/Auth/google`, requestData);
          
          // Log the response
          console.log('Backend response:', response.data);
          setDebugInfo(prev => ({ 
            ...prev, 
            backendResponse: true,
            responseData: response.data 
          }));

          // Store tokens in cookies
          document.cookie = serialize('accessToken', response.data.access, {
            httpOnly: false,
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            path: '/',
          });
          
          document.cookie = serialize('refreshToken', response.data.refresh, {
            httpOnly: false,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            path: '/',
          });
          
          // Check cookies are set
          const cookies = document.cookie;
          setDebugInfo(prev => ({ 
            ...prev, 
            cookiesSet: cookies.includes('accessToken') && cookies.includes('refreshToken'),
            cookies: cookies
          }));
          
          // Add a delay before redirecting to see the success message
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        
        } catch (backendError: any) {
          console.error('Backend API error:', backendError);
          setDebugInfo(prev => ({ 
            ...prev, 
            backendError: true,
            errorStatus: backendError?.response?.status,
            errorData: backendError?.response?.data || backendError.message 
          }));
          throw backendError;
        }
        
      } catch (err: any) {
        console.error('Google Authentication failed:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        
        setDebugInfo(prev => ({ 
          ...prev, 
          finalError: err instanceof Error ? err.message : String(err),
          stack: err instanceof Error ? err.stack : undefined
        }));
        
        // Redirect to sign in page with error after a delay
        setTimeout(() => {
          navigate('/auth/signin?error=google_failed');
        }, 5000); // Longer delay to see error info
      } finally {
        setIsLoading(false);
      }
    };

    handleCallback();
  }, [navigate]);

  // This function would exchange the authorization code for tokens
  const exchangeCodeForToken = async (code: string): Promise<GoogleTokenResponse> => {
    // In a real app, your backend would do this exchange for security reasons
    console.log('Exchanging code for token:', code.substring(0, 10) + '...');
    
    // This is a simulation - in production, this would happen server-side for security
    return {
      id_token: code, // For this demo, we'll pretend the code is the ID token
      expires_in: 3600
    };
  };

  return { isLoading, error, debugInfo };
};

export default useGoogleAuth; 