"use client"
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    // const code = params.get('code');

    // if (!code) {
      navigate("/home");
    // } else {
    //   navigate("/auth/signin?error=google_failed");
    // }
  }, [navigate]);

  return <div>...</div>;
};

export default OAuthCallback;