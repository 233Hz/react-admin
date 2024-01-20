import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface State {
  token: string;
  refreshToken: string;
}

interface Action {
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useAuthStore = create<State & Action>()(
  devtools(
    persist(
      set => {
        return {
          token: '',
          refreshToken: '',
          setToken: (token: State['token']) => set({ token }),
          setRefreshToken: (refreshToken: State['refreshToken']) => set({ refreshToken }),
        };
      },
      {
        name: 'authStore',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: 'authStore',
    }
  )
);
