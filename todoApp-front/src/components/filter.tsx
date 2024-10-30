"use client";
import { useEffect } from "react";
import { useTaskModalStore } from "../store/taskModalStore"; // Importar el store de modal de tareas
import ModalTask from "@/components/modaltask"; // Modal específico para tareas
import useUserStore from "../store/userStore";
import useTaskStore from "../store/taskStore";
import { fetchTask } from "../services/dataService";
import { FaPlus } from "react-icons/fa"; // Importar el ícono de "+"

export enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

// Definir las props que recibirá FilterTask
interface FilterTaskProps {
  titleFilter: string;
  setTitleFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
  statusFilter: Status | "";
  setStatusFilter: (value: Status | "") => void;
}

export default function FilterTask({
  titleFilter,
  setTitleFilter,
  dateFilter,
  setDateFilter,
  statusFilter,
  setStatusFilter,
}: FilterTaskProps) {
  const { isOpen, closeModal, openModal } = useTaskModalStore(); // Para modal general
  const { userName, setUserName } = useUserStore();
  const { tasks, setTasks } = useTaskStore();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    setUserName(storedUserName || "Invitado");

    const fetchAndSetTasks = async () => {
      try {
        const data = await fetchTask();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchAndSetTasks();
  }, [setTasks, setUserName]);

  const filteredTasks = tasks.filter((task) => {
    const matchesTitle = task.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesDate = dateFilter
      ? task.createdAt.split("T")[0] === dateFilter
      : true;
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    return matchesTitle && matchesDate && matchesStatus;
  });

  const handleOpenModalTask = () => {
    console.log("Botón de abrir modal de tareas presionado"); // Registro de acción
    openModal(); // Abrir modal de tareas usando Zustand
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="bg-white w-full lg:w-96 p-4">
        <div className="flex text-green-400 justify-start gap-4 items-center mb-4">
          <div className="bg-blue-600 h-14 w-14 rounded-full">
            <img
              src="https://i.pinimg.com/564x/95/b2/86/95b28609b5044e1a2706bee4e659a02a.jpg"
              alt="logo"
              className="h-14 w-14 rounded-full"
            />
          </div>
          <span>Hola {userName}</span>
          <button
            onClick={handleOpenModalTask}
            className="flex items-center justify-center h-10 w-10 bg-green-500 rounded-full text-white ml-2 transition-all duration-200 hover:bg-green-600"
          >
            <FaPlus />
          </button>
        </div>

        <input
          type="text"
          className="bg-white w-full text-black border-2 border-green-500 h-10 rounded-lg mt-4 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-md transition-all duration-200"
          placeholder="title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)} // Manejar cambio de título
        />

        <input
          type="date"
          className="bg-white w-full text-black border-2 border-green-500 h-10 rounded-lg mt-4 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-md transition-all duration-200"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)} // Manejar cambio de fecha
        />

        <select
          className="bg-white w-full text-black border-2 border-green-500 h-10 rounded-lg mt-4 px-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-md transition-all duration-200"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as Status)} // Manejar cambio de estado
        >
          <option value="">All Status</option>
          <option value={Status.OPEN}>{Status.OPEN}</option>
          <option value={Status.IN_PROGRESS}>{Status.IN_PROGRESS}</option>
          <option value={Status.DONE}>{Status.DONE}</option>
        </select>

        <button className="bg-green-500 text-white h-10 rounded-lg mt-4 w-full transition-all duration-200 hover:bg-green-600">
          Search
        </button>
      </div>
      {isOpen && <ModalTask onClose={closeModal} />}{" "}

    </div>
  );
}