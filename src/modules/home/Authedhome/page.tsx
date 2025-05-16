import { useUserStore } from '@/modules/shared/store/userStore';
import { lazy, useState, useEffect } from 'react';
// import { updateUser } from '@/modules/ProfileManagement/services/userService';
import { ChooseUserTypeDialog } from './components/ChooseUserTypeDialog';

const SearchSection = lazy(
  () => import('@/modules/home/Authedhome/components/searchSection')
);
const Oppertunities = lazy(
  () => import('@/modules/home/Authedhome/components/oppertunities')
);
import homeService from './services/home.service';

const AuthedHome = () => {
  const { user, login } = useUserStore();
  const [isTypeDialogOpen, setIsTypeDialogOpen] = useState(false);

  useEffect(() => {
    if (user && !user.type) {
      setIsTypeDialogOpen(true);
    }
  }, [user]);

  const handleTypeSelect = async (type: 'Student' | 'Company') => {
    if (!user) return;
    try {
      const updatedUser = await homeService.setUserType(type);
      login(updatedUser);
    } catch (error) {
      console.error('Failed to update user type from page:', error);
      throw error;
    }
  };

  return (
    <main>
      <SearchSection />
      <Oppertunities />

      <ChooseUserTypeDialog
        isOpen={isTypeDialogOpen}
        onOpenChange={setIsTypeDialogOpen}
        onSelectType={handleTypeSelect}
      />
    </main>
  );
};
export default AuthedHome;
