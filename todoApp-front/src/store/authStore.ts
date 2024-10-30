// src/store/authStore.ts
import { create } from "zustand";

interface AuthState {
  isLogin: boolean;
  email: string;
  password: string;
  username: string;
  toggleLogin: () => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setUsername: (username: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: true,
  email: "",
  password: "",
  username: "",
  toggleLogin: () => set((state) => ({ isLogin: !state.isLogin })),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setUsername: (username) => set({ username }),
}));
