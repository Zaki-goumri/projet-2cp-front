'use client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      console.log(code); //to do send it to the backend
      navigate('/home');
    } else {
      navigate('/auth/signin?error=google_failed');
    }
  }, [navigate]);

  const handleAuthentication = async (code: string) => {
    try {
      // to send to backend
    } catch (err) {
      navigate('/auth/signin?error=auth_failed');
    }
  };
  return <div>...</div>;
};

export default OAuthCallback;
