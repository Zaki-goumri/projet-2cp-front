import { useUserStore } from '@/modules/shared/store/userStore';
import {lazy} from 'react';
const SearchSection = lazy(
  () => import('@/modules/home/Authedhome/components/searchSection')
);
const Oppertunities = lazy(
  () => import('@/modules/home/Authedhome/components/oppertunities')
);


const AuthedHome = () => {
  return (
    <main>
      <SearchSection />
      <Oppertunities />
    </main>
  );
};
export default AuthedHome;
