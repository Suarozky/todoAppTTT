// src/store/modalStore.ts
import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  title: string;
  description: string;
  date: string;
  status: string;
  taskId: string;
  openModal: () => void;
  closeModal: () => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setDate: (date: string) => void;
  setStatus: (status: string) => void;
  setTaskId: (taskId: string) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  title: "",
  description: "",
  date: "",
  status: "",
  taskId: "",
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
  setTaskId: (taskId) => set({ taskId }),
}));
