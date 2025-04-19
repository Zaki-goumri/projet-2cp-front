import { create } from 'zustand';
import { persist, createJSONStorage } from "zustand/middleware";
import { logoutUser } from '@/modules/auth/signin/services/singin.services';


export interface User {
  id: number;
  email: string;
  name: string;
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
      login: (userData) => set({ user: userData }),
      logout: () => {
        logoutUser().catch(error => console.error('Error during logout:', error));
        set({ user: null });
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
      migrate: (persistedState, version) => {
        if (version !== 0) return persistedState;
        return persistedState as UserStore;
      },
    },
  ),
);
