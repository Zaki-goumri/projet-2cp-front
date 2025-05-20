import { useUserStore } from '@/modules/shared/store/userStore';
import { lazy, useState, useEffect } from 'react';
// import { updateUser } from '@/modules/ProfileManagement/services/userService';
import { ChooseUserTypeDialog } from './components/ChooseUserTypeDialog';
import { motion } from 'framer-motion';

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
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50/50"
    >
      <div className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-4 top-0 h-72 w-72 animate-blob rounded-full bg-[#98E9AB]/20 blur-3xl" />
          <div className="absolute -right-4 top-0 h-72 w-72 animate-blob animation-delay-2000 rounded-full bg-blue-200/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/2 h-72 w-72 animate-blob animation-delay-4000 rounded-full bg-purple-200/20 blur-3xl" />
        </div>

        <div className="relative">
          <SearchSection />
          <Oppertunities />
        </div>
      </div>

      <ChooseUserTypeDialog
        isOpen={isTypeDialogOpen}
        onOpenChange={setIsTypeDialogOpen}
        onSelectType={handleTypeSelect}
      />
    </motion.main>
  );
};
export default AuthedHome;
