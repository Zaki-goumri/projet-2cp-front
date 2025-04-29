import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useUserStore } from '@/modules/shared/store/userStore';

const getCooKies = () => {
  const cookies = document.cookie.split(';');
  const accessTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith('accessToken=')
  );
  const refreshTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith('refreshToken=')
  );
  return {
    accessToken: accessTokenCookie
      ? accessTokenCookie.split('=')[1].trim()
      : null,
    refreshToken: refreshTokenCookie
      ? refreshTokenCookie.split('=')[1].trim()
      : null,
  };
};

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
  fallback?: ReactNode;
}

export const ProtectedRoute = ({
  children,
  redirectPath = '/auth/signin',
  fallback,
}: ProtectedRouteProps) => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  if (!user && !getCooKies().accessToken && !getCooKies().refreshToken) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <Navigate to={redirectPath} state={{ from: location.pathname }} replace />
    );
  }

  return <>{children}</>;
};
