import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

export const AuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const from = location.state?.from || '/';
    navigate(from, { replace: true });
  }, [navigate, location]);
  return null;
};

