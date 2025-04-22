import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { baseUrl } from '@/api/axios.config';
import { useUserStore } from '@/modules/shared/store/userStore';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const setUser = useUserStore((state) => state.login);
  useEffect(() => {
    const handleAuthentication = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (!code) {
          console.error('No authorization code received from Google');
          navigate('/auth/signin?error=google_failed');
          return;
        }

        const formData = new URLSearchParams();
        formData.append('code', code);

        const response = await axios.post(`${baseUrl}/Auth/google`, formData);

        setUser(response.data.user);
        document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=3600`;
        document.cookie = `refreshToken=${response.data.refreshToken}; path=/; max-age=2592000`;

        navigate('/home');
      } catch (error) {
        console.error('Authentication failed:', error);
        navigate('/auth/signin?error=auth_failed');
      } finally {
        setLoading(false);
      }
    };

    handleAuthentication();
  }, [navigate]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      {loading && (
        <div className="text-center">
          <p className="mb-2 text-lg">Processing your login...</p>
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default OAuthCallback;

