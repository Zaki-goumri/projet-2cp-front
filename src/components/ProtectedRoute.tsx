import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useUserStore } from '@/modules/shared/store/userStore';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
  fallback?: ReactNode;
}

export const ProtectedRoute = ({ 
  children, 
  redirectPath = '/auth/signin',
  fallback 
}: ProtectedRouteProps) => {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}; 