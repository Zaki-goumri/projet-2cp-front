'use client';
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
          console.error('No authorization code received from LinkedIn');
          navigate('/auth/signin?error=linkedin_failed');
          return;
        }

        const formData = new URLSearchParams();
        formData.append('code', code);
        const response = await axios.post(`${baseUrl}/Auth/linkedin`, formData);
        setUser(response.data.user);
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
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      {loading && (
        <div className="text-center">
          <p className="text-lg mb-2">Processing your login...</p>
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default OAuthCallback;
