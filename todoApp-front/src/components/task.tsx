import React from "react";
import { useModalStore } from "../store/modalStore";

// components/task.tsx
export interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: string;
  onClick: () => void; // Asegúrate de que onClick esté incluido aquí
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  createdAt,
  status,
  onClick,
}) => {
  const { openModal, setTaskId } = useModalStore(); // Usa setTaskId para establecer el ID de la tarea

  return (
    <button
      onClick={() => {
        setTaskId(id); // Establece el taskId antes de abrir el modal
        openModal(); // Abre el modal al hacer clic
        onClick(); // Llama a la función onClick si se pasa
      }}
      className="flex flex-col justify-between items-start p-4 w-[32vh] lg:w-[32vh] h-[32vh] 
                 border-2 border-white border-opacity-20 bg-white bg-opacity-20 
                 shadow-2xl backdrop-blur-3xl transition-all duration-300 hover:scale-105 
                 hover:bg-green-500 hover:shadow-green-500"
    >
      <h3 className="font-bold text-xl text-black text-opacity-100">{title}</h3>
      <p className="text-gray-700">{description}</p>
      <div className="flex flex-col text-gray-500 text-sm">
        <span>{status}</span>
      </div>
    </button>
  );
};

export default TaskCard;
