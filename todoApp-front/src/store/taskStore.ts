// store.ts
import {create} from 'zustand';

// Define la interfaz para una tarea
interface Task {
  id: string; // o number, según cómo tengas configurado tu backend
  title: string;
  description: string;
  createdAt: string; // o Date, dependiendo de cómo manejes las fechas
  status: string;
}

// Define la interfaz del estado de la tienda
interface TaskStore {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

// Crea la tienda de Zustand
const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));

export default useTaskStore;
