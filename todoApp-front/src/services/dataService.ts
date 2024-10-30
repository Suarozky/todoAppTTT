// services/dataService.ts

const getAccessToken = () => localStorage.getItem("accessToken");
const getUserId = () => localStorage.getItem("userId");

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const accessToken = getAccessToken();
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Lanza un error si la respuesta no es correcta
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  // Si la respuesta es 204 (No Content), simplemente no hay contenido para analizar
  if (response.status === 204) {
    return null; // Devolver null si no hay contenido
  }

  const textResponse = await response.text();
  return textResponse ? JSON.parse(textResponse) : null; // Analizar solo si hay contenido
};

export const fetchTask = async () => {
  const userId = getUserId();
  return fetchWithAuth(`http://localhost:3001/tasks/task/${userId}`);
};

export const fetchUser = async (userId: string) => {
  return fetchWithAuth(`http://localhost:3001/user/${userId}`);
};

// src/api/taskApi.ts
export enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export const fetchCreateTask = async (
  title: string,
  description: string,
  status: Status
) => {
  const userId = getUserId();

  const newTask = await fetchWithAuth(`http://localhost:3001/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      status,
      userId,
    }),
  });

  // Obtener la lista actualizada de tareas después de crear una nueva tarea
  const tasks = await fetchTask(); // Esto actualizará la lista de tareas

  // Aquí puedes devolver la nueva tarea o la lista actualizada
  return { newTask, tasks };
};

export const fetchUpdateTask = async (
  taskId: string,
  title: string,
  description: string,
  createdAt: Date,
  status: Status
) => {
  const updatedTask = await fetchWithAuth(
    `http://localhost:3001/tasks/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, createdAt, status }),
    }
  );

  // Obtener la lista actualizada de tareas después de la actualización
  const tasks = await fetchTask(); // Esto actualizará la lista de tareas

  return { updatedTask, tasks };
};

export const fetchDeleteTask = async (taskId: string): Promise<string> => {
  const response = await fetchWithAuth(
    `http://localhost:3001/tasks/${taskId}`,
    {
      method: "DELETE",
    }
  );

  // Verifica si la respuesta es válida
  if (response === null) {
    return "Task deleted"; // Mensaje de éxito si se eliminó
  }

  // Si necesitas verificar algo más, puedes manejarlo aquí
  return "Task deleted"; // Mensaje de éxito
};
