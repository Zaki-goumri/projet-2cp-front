import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    if (code) {
      navigate('/home');
    } else {
      navigate('/auth/signin?error=google_failed');
    }
  }, [navigate]);

  // const handleAuthentication = async (code: string) => {
  //   try {
  //     console.log(code); //to do send it to the backend
  //     navigate('/home');
  //   } catch (err) {
  //     console.error('Authentication failed:', err);
  //     navigate('/auth/signin?error=auth_failed');
  //   }
  // };

  return <div className="h-screen w-screen bg-white" />;
};

export default OAuthCallback;
