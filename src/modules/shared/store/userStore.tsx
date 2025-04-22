import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { logoutUser } from '@/modules/auth/signin/services/singin.services';
import { Attachment } from '../types/attachement';

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
  profilepic?: string;
  type: string;
  role: 'Student' | 'Professional' | 'Admin';
  description:string 
  skills: string[];
  education: ExperienceData[];
  experience: ExperienceData[],
  date_joined:string,
  cv?: Attachment
}

interface UserStore {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      login: (userData: User) => set({ user: userData }),
      logout: async () => {
        try {
          await logoutUser();
          set({ user: null });
        } catch (error) {
          console.error('Error logging out:', error);
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
