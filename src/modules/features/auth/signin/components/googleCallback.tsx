import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of params.entries()) {
      console.log(`${key}: ${value}`);
    }
    const code = params.get('code');
    if (code) {
      navigate("/home");
    } else {
      navigate("/auth/signin?error=google_failed");
    }
  }, []);

  return <div className='h-screen w-screen bg-white'/>;
};

export default OAuthCallback;