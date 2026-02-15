import { useEffect, useRef, useState } from "react";
import { type Mode, type Task } from "./types";
import TaskModal from "./components/TaskModal";
import { useTaskDetail, useTasks } from "./hooks/useTasks";
import { Pagination } from "./components/Pagination";
import TaskSection from "./components/TaskSection";
import Loading from "./components/Loading";
import Error from "./components/Error";
import PrioritySection from "./components/PrioritySection";
import HeaderSection from "./components/HeaderSection";
import { DeleteModal } from "./components/DeleteModal";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortDir, setSortDir] = useState<string>("desc");
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [modalMode, setModalMode] = useState<Mode>("view");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { tasks, isLoading, isFetching, isError, pagination } = useTasks(page, 10, sortBy, sortDir, searchQuery);
  const { data: fullTask, isFetching: isFetchingDetail } = useTaskDetail(selectedTaskId);

  // When search for a task
  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

  // Scroll to the top
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [page]);

  const handleAction = (mode: Mode, task?: Task) => {
    if (task) setSelectedTaskId(task.id);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedTaskId(null);
  };

  const handleDelete = (id: number) => {
    setTaskIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // const filteredTasks = tasks.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

  {
    isLoading && <Loading />;
  }

  {
    isError && <Error />;
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-br from-[#29235C] to-[#52537E] overflow-hidden">
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold text-white bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-white/20">
          Mini Task Tracker
        </h1>

        {/* Stats section */}
        <PrioritySection />

        {/* Search and actions */}
        <HeaderSection
          search={searchQuery}
          setSearch={setSearchQuery}
          sortBy={sortBy}
          sortDir={sortDir}
          onSort={(field, dir) => {
            setSortBy(field);
            setSortDir(dir);
            setPage(0);
          }}
          onView={() => handleAction("add")}
        />

        {/* Tasks section */}
        <TaskSection
          tasks={tasks}
          isFetching={isFetching}
          handleAction={handleAction}
          onDelete={handleDelete}
        />

        {/* Pagination for desktop view */}
        {pagination.totalPages > 1 && (
          <div className="hidden md:block w-full max-w-6xl">
            <Pagination currentPage={page} totalPages={pagination.totalPages} onPageChange={setPage} />
          </div>
        )}
      </div>

      {/* Pagination for mobile view */}
      {pagination.totalPages > 1 && (
        <div className="md:hidden w-full bg-slate-900/40 backdrop-blur-xl border-t border-white/10 px-6">
          <div className="max-w-6xl mx-auto">
            <Pagination currentPage={page} totalPages={pagination.totalPages} onPageChange={setPage} />
          </div>
        </div>
      )}

      <TaskModal
        task={fullTask || null}
        isLoading={isFetchingDetail}
        mode={modalMode}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEditClick={() => setModalMode("edit")}
      />

      <DeleteModal isOpen={isDeleteModalOpen} taskId={taskIdToDelete} onClose={() => setIsDeleteModalOpen(false)} />
    </div>
  );
}

export default App;
