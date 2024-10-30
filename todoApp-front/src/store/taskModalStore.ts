// src/store/taskModalStore.ts
import { create } from "zustand";

interface TaskModalStore {
  isOpen: boolean;
  title: string;
  description: string;
  date: string;
  status: string;
  openModal: () => void;
  closeModal: () => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setDate: (date: string) => void;
  setStatus: (status: string) => void;
}

export const useTaskModalStore = create<TaskModalStore>((set) => ({
  isOpen: false,
  title: "",
  description: "",
  date: "",
  status: "",
  openModal: () => set({ isOpen: true }),
  closeModal: () => {
    set({
      isOpen: false,
      title: "",
      description: "",
      date: "",
      status: "", // Resetear el estado de status al cerrar
    });
  },
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setDate: (date) => set({ date }),
  setStatus: (status) => set({ status }),
}));
