import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { baseUrl } from '@/api/axios.config';
import { useUserStore } from '@/modules/shared/store/userStore';
import Loading from '@/loading';
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

        setUser({ ...response.data.user });
        document.cookie = `accessToken=${response.data.access}; path=/; max-age=3600`;
        document.cookie = `refreshToken=${response.data.refresh}; path=/; max-age=2592000`;

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
      {loading && <Loading />}
    </div>
  );
};

export default OAuthCallback;
