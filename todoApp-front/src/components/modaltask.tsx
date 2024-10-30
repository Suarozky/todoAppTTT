// src/components/ModalTask.tsx
import React from "react";
import { useTaskModalStore } from "../store/taskModalStore";
import { fetchCreateTask, Status } from "../services/dataService";

interface ModalTaskProps {
  onClose: () => void; // Prop para cerrar el modal
}

const ModalTask: React.FC<ModalTaskProps> = ({ onClose }) => {
  const { isOpen, title, description, setTitle, setDescription } =
    useTaskModalStore();

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  // Manejo del clic en el fondo para cerrar el modal
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose(); // Cerrar el modal
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Enviar datos de la tarea
      const createdTask = await fetchCreateTask(
        title,
        description,
        Status.OPEN // Asegúrate de que Status esté definido
      );
      console.log("Tarea creada:", createdTask);
      onClose(); // Cerrar el modal después de crear la tarea

      // Recargar la página
      window.location.reload(); // Esto recargará la página automáticamente
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
      style={{ zIndex: 9999 }} // Asegúrate de que esté muy por encima
    >
      <div
        className="bg-white p-6 rounded text-green-500 shadow-md w-80"
        style={{ zIndex: 10000 }}
      >
        <h2 className="text-xl font-bold mb-4">Crear Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-green-500 text-white rounded-md p-2"
          >
            Crear Tarea
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 w-full text-red-500"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalTask;
