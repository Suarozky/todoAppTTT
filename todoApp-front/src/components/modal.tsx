import React from "react";
import { useModalStore } from "../store/modalStore";
import { fetchUpdateTask, fetchDeleteTask, Status } from "../services/dataService";
import { FaTrash } from "react-icons/fa"; // Asegúrate de instalar react-icons

export interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const {
    isOpen,
    closeModal,
    title,
    description,
    date,
    status,
    taskId,
    setTitle,
    setDescription,
    setDate,
    setStatus,
  } = useModalStore();

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdAt = new Date(date);
      const updatedTask = await fetchUpdateTask(
        taskId,
        title,
        description,
        createdAt,
        status as Status
      );
      console.log("Tarea actualizada:", updatedTask);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetchDeleteTask(taskId);
      console.log(`Tarea ${taskId} eliminada`);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="relative bg-white p-6 rounded text-green-500 shadow-md w-80 h-{500px}"> {/* Cambia el tamaño aquí */}
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 text-red-500"
          aria-label="Eliminar tarea"
        >
          <FaTrash size={12} /> {/* Tamaño del ícono */}
        </button>

        <h2 className="text-xl font-bold">Editar Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className="">
            <label className="block text-sm font-medium text-gray-700" htmlFor="title">
              Título
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className=" block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
              Descripción
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className=" block w-full border border-gray-300 rounded-md "
              rows={3}
            />
          </div>
          <div className="">
            <label className="block text-sm font-medium text-gray-700" htmlFor="date">
              Fecha
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className=" block w-full border border-gray-300 rounded-md "
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="status">
              Estado
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
              required
              className=" block w-full border border-gray-300 rounded-md p-2"
            >
              <option value={Status.OPEN}>{Status.OPEN}</option>
              <option value={Status.IN_PROGRESS}>{Status.IN_PROGRESS}</option>
              <option value={Status.DONE}>{Status.DONE}</option>
            </select>
          </div>
          <button
            type="submit"
            className=" w-full bg-green-500 text-white rounded-md p-2"
          >
            Editar Tarea
          </button>
          <button
            type="button"
            onClick={closeModal}
            className=" w-full text-red-500"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
