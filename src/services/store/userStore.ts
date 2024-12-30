import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import MMKVStorage from '../../utils/MMKVStorage';


interface UserStore {
  user: any | null; 
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: null,
      setUser: (user) => set({user}),
      clearUser: () => set({user: null}),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(()=>MMKVStorage),
    }
  )
);