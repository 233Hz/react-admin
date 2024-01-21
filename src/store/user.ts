import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';

interface State {
  token: string;
  refreshToken: string;
  nickName: string;
  avatar?: string;
}

type TokenInfo = Pick<State, 'token' | 'refreshToken'>;
type userInfo = Omit<State, 'token' | 'refreshToken'>;

interface Action {
  setToken: (token: string) => void;
  setTokenInfo: (tokenInfo: TokenInfo) => void;
  setUserInfo: (userInfo: userInfo) => void;
  clearInfo: () => void;
}

export const useUserStore = create<State & Action>()(
  devtools(
    persist(
      set => {
        return {
          token: '',
          refreshToken: '',
          nickName: '',
          avatar: '',
          setToken: (token: string) => set({ token }),
          setTokenInfo: (tokenInfo: TokenInfo) => set({ ...tokenInfo }),
          setUserInfo: (userInfo: userInfo) => set({ ...userInfo }),
          clearInfo: () => set({ token: '', refreshToken: '', nickName: '', avatar: '' }),
        };
      },
      {
        name: 'userStore',
        storage: createJSONStorage(() => localStorage),
      }
    ),
    {
      name: 'userStore',
    }
  )
);
