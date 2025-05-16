import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { signinService } from '@/modules/auth/signin/services/signin.service';
import { Student, Company } from '../types/shared.types';

interface UserStore {
  user: Student | Company | null;
  login: (userData: Student | Company) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<Student | Company>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      login: (userData: Student | Company) => set({ user: userData }),
      logout: async () => {
        try {
          await signinService.logout();
          set({ user: null });
        } catch (error) {
          console.error('Error logging out:', error);
        }
      },
      updateUser: (updatedData: Partial<Student | Company>) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedData } : null,
        })),
    }),
    {
      name: `user-storage`,
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState, version) => {
        if (version !== 0) return persistedState;
        return persistedState as UserStore;
      },
    }
  )
);
