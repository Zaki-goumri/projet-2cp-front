import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { logoutUser } from '@/modules/auth/signin/services/singin.services';

export interface ExperienceData{
  id:string;
 company: string;
    role: string;
    startDate: string;
    endDate: string | null;

}
export interface User {
  id: number;
  email: string;
  name: string;
  profilepic: string | null;
  type: string;
  role: 'Student' | 'Professional' | 'Admin';
  description:string 
  skills: string[];
  education: ExperienceData[];
  experience: ExperienceData[],
  date_joined:string
}

interface UserStore {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => {
        logoutUser().catch((error) =>
          console.error('Error during logout:', error)
        );
        set({ user: null });
      },
      updateUser: (updatedData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updatedData } });
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState, version) => {
        if (version !== 0) return persistedState;
        return persistedState as UserStore;
      },
    }
  )
);
