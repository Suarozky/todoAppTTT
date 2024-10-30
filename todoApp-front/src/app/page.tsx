"use client";
import { useState } from "react";
import TaskCard from "../components/task";
import { useModalStore } from "../store/modalStore";
import Modal from "../components/modal"; // Modal generales
import FilterTask from "../components/filter";
import useTaskStore from "../store/taskStore";

export enum Status {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

// Componente Home
export default function Home() {
  const { isOpen, closeModal } = useModalStore();
  const { tasks } = useTaskStore();

  // Estados de filtros
  const [titleFilter, setTitleFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "">("");
  const [modalTaskOpen, setModalTaskOpen] = useState(false); // Estado para abrir el modal de tareas

  // Filtrar las tareas
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

  return (
    <div className="flex flex-col lg:flex-row">
      <FilterTask
        titleFilter={titleFilter}
        setTitleFilter={setTitleFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      {/* Sección de las tarjetas */}
      <div className="flex-1 flex justify-center items-center ml-10 p-4 mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              createdAt={task.createdAt}
              status={task.status}
              onClick={() => setModalTaskOpen(true)} // Abre el modal al hacer clic
            />
          ))}
        </div>
      </div>
      {isOpen && <Modal onClose={closeModal} />}
      {modalTaskOpen && <Modal onClose={() => setModalTaskOpen(false)} />}{" "}
      {/* Modal de tareas */}
    </div>
  );
}
