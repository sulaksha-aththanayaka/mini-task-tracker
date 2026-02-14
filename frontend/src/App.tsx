import { useState } from "react";
import AddTaskButton from "./components/AddTaskButton";
import PriorityCard from "./components/PriorityCard";
import SearchBar from "./components/SearchBar";
import SortDropDown from "./components/SortDropDown";
import TaskCard from "./components/TaskCard";
import ViewSwitcher from "./components/ViewSwitcher";
import { type Task, TaskStatus, Priority } from "./types";
import TaskModal from "./components/TaskModal";

export const DUMMY_TASKS: Task[] = [
  {
    id: 1,
    title: "Finalize Backend API",
    description:
      "Implement the remaining CRUD endpoints and ensure the GlobalExceptionHandler catches all validation errors.",
    status: TaskStatus.TODO,
    priority: Priority.HIGH,
    dueDate: "2026-02-25",
    createdAt: "2026-02-10T10:00:00Z",
    updatedAt: "2026-02-12T14:30:00Z",
  },
  {
    id: 2,
    title: "Setup Tailwind v4",
    description: "Migrate the frontend styling to Tailwind v4 using the new CSS-first configuration approach.",
    status: TaskStatus.DONE,
    priority: Priority.MEDIUM,
    dueDate: "2026-02-20",
    createdAt: "2026-02-11T09:00:00Z",
    updatedAt: "2026-02-13T18:15:00Z",
  },
  {
    id: 3,
    title: "Design UI Mockups",
    description: "Create high-fidelity mockups for the dashboard, task list, and pagination components.",
    status: TaskStatus.DONE,
    priority: Priority.LOW,
    dueDate: "2026-02-18",
    createdAt: "2026-02-08T11:00:00Z",
    updatedAt: "2026-02-12T09:00:00Z",
  },
  {
    id: 4,
    title: "Implement TaskForm Component",
    description: "Build a reusable React form for creating and editing tasks with full TypeScript validation.",
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.HIGH,
    dueDate: "2026-03-01",
    createdAt: "2026-02-13T12:00:00Z",
    updatedAt: "2026-02-13T12:00:00Z",
  },
  {
    id: 5,
    title: "Fix Pagination Bug",
    description: "Resolve the issue where the 'Next' button remains active on the final page of the task list.",
    status: TaskStatus.TODO,
    priority: Priority.MEDIUM,
    dueDate: "2026-02-28",
    createdAt: "2026-02-12T15:00:00Z",
    updatedAt: "2026-02-12T15:45:00Z",
  },
  {
    id: 6,
    title: "Database Migration",
    description: "Write the Flyway/Liquibase scripts to add the 'priority' column to the task table.",
    status: TaskStatus.DONE,
    priority: Priority.HIGH,
    dueDate: "2026-02-15",
    createdAt: "2026-02-05T08:30:00Z",
    updatedAt: "2026-02-10T10:00:00Z",
  },
  {
    id: 7,
    title: "Add Unit Tests",
    description: "Achieve 80% code coverage on service-layer methods using JUnit 5 and Mockito.",
    status: TaskStatus.IN_PROGRESS,
    priority: Priority.MEDIUM,
    dueDate: "2026-03-05",
    createdAt: "2026-02-13T10:00:00Z",
    updatedAt: "2026-02-13T11:30:00Z",
  },
  {
    id: 8,
    title: "Accessibility Audit",
    description: "Ensure all buttons have aria-labels and the color contrast meets WCAG AA standards.",
    status: TaskStatus.TODO,
    priority: Priority.LOW,
    dueDate: "2026-03-10",
    createdAt: "2026-02-13T14:00:00Z",
    updatedAt: "2026-02-13T14:00:00Z",
  },
  {
    id: 9,
    title: "Update README.md",
    description: "Document the pnpm installation steps and the monorepo structure for the project reviewer.",
    status: TaskStatus.TODO,
    priority: Priority.LOW,
    dueDate: "2026-03-12",
    createdAt: "2026-02-13T16:00:00Z",
    updatedAt: "2026-02-13T16:00:00Z",
  },
  {
    id: 10,
    title: "Deploy to Staging",
    description: "Configure the Dockerfile and push the image to the container registry for testing.",
    status: TaskStatus.TODO,
    priority: Priority.HIGH,
    dueDate: "2026-03-15",
    createdAt: "2026-02-13T17:00:00Z",
    updatedAt: "2026-02-13T17:00:00Z",
  },
  {
    id: 11,
    title: "User Feedback Session",
    description: "Conduct a 30-minute walkthrough with a stakeholder to gather feedback on the new card design.",
    status: TaskStatus.TODO,
    priority: Priority.MEDIUM,
    dueDate: "2026-03-18",
    createdAt: "2026-02-13T18:00:00Z",
    updatedAt: "2026-02-13T18:00:00Z",
  },
];

export const priorityStats = {
  high: 5,
  medium: 12,
  low: 8,
};

const PRIORITY_CARDS = [
  {
    label: "High Priority",
    key: "high",
    count: priorityStats.high,
    borderColor: "border-l-rose-500",
    textColor: "text-rose-600",
  },
  {
    label: "Medium Priority",
    key: "medium",
    count: priorityStats.medium,
    borderColor: "border-l-amber-500",
    textColor: "text-amber-600",
  },
  {
    label: "Low Priority",
    key: "low",
    count: priorityStats.low,
    borderColor: "border-l-sky-500",
    textColor: "text-sky-600",
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (task: Task, mode: "view" | "edit") => {
    setSelectedTask(task);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const filteredTasks = DUMMY_TASKS.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-[#29235C] to-[#52537E] p-6">
      <h1 className="text-3xl font-bold text-white bg-white/10 px-6 py-2 rounded-full backdrop-blur-sm border border-white/20">
        Mini Task Tracker
      </h1>
      <div className="flex gap-4 w-full justify-center max-w-6xl">
        {PRIORITY_CARDS.map((card) => (
          <PriorityCard data={card} key={card.label} />
        ))}
      </div>

      <div className="w-full max-w-6xl p-4 rounded-[28px] bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-auto flex-1">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <SortDropDown />
            <AddTaskButton />
            <ViewSwitcher />
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="grid md:grid-cols-2 w-full max-w-6xl gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              data={task}
              key={task.id}
              onView={() => handleAction(task, "view")}
              onEdit={() => handleAction(task, "edit")}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-white/50">
            <p className="text-xl">No tasks found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      <TaskModal task={selectedTask} mode={modalMode} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
