import type { Mode, Task } from "@/types";
import TaskCard from "./TaskCard";

interface TaskSectionProps {
  isFetching: boolean;
  tasks: Task[];
  handleAction: (mode: Mode, task?: Task) => void;
  onDelete: (id: number) => void;
}

const TaskSection = ({ isFetching, tasks, handleAction, onDelete }: TaskSectionProps) => {
  return (
    <div className="relative w-full max-w-6xl">
      {isFetching && (
        <div className="absolute inset-0 z-10 bg-white/5 backdrop-blur-[2px] rounded-[28px] flex items-start justify-center pt-20 transition-all">
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-xl flex items-center gap-2 animate-bounce">
            <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            Updating Tasks...
          </div>
        </div>
      )}
      <div className="grid sm:grid-cols-2 w-full max-w-6xl gap-4 md:gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              data={task}
              key={task.id}
              onView={() => handleAction("view", task)}
              onEdit={() => handleAction("edit", task)}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-white/50">
            <p className="text-xl">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskSection;
