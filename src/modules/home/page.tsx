import React from 'react';
const AuthedHome = React.lazy(() => import('@/modules/home/Authedhome/page'));
const UnAuthedHome = React.lazy(
  () => import('@/modules/home/unAuthedhome/page')
);
import { useUserStore } from '../shared/store/userStore';
const HomaPage = () => {
  const user = useUserStore((state) => state.user);

  return (
    <div className="flex flex-col">
      {user ? <AuthedHome /> : <UnAuthedHome />}
    </div>
  );
};
export default HomaPage;
