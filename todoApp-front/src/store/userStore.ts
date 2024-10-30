// ../store/userStore.ts
import {create} from "zustand";

interface UserState {
  userName: string;
  setUserName: (name: string) => void;
}

const useUserStore = create<UserState>((set) => ({
  userName: "",
  setUserName: (name) => set({ userName: name }),
}));

export default useUserStore;
