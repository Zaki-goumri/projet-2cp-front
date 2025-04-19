import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const AuthedHome = React.lazy(() => import('@/modules/home/Authedhome/page'));
const UnAuthedHome = React.lazy(
  () => import('@/modules/home/unAuthedhome/page')
);
import { useUserStore } from '../shared/store/userStore';

const queryClient = new QueryClient();

const HomaPage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col">
        {user ? <AuthedHome /> : <UnAuthedHome />}
      </div>
    </QueryClientProvider>
  );
};
export default HomaPage;
