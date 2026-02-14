import { Calendar, Eye, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Task } from "@/types";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  data: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete?: (id: number) => void;
}

const STATUS_MAP = {
  TO_DO: { label: "To Do", color: "bg-slate-500" },
  IN_PROGRESS: { label: "In Progress", color: "bg-indigo-500" },
  DONE: { label: "Done", color: "bg-emerald-500" },
};

const PRIORITY_MAP = {
  LOW: { label: "Low", color: "bg-blue-500" },
  MEDIUM: { label: "Medium", color: "bg-amber-500" },
  HIGH: { label: "High", color: "bg-rose-500" },
};

const TaskCard = ({ data, onView, onEdit, onDelete }: TaskCardProps) => {
 const statusInfo = STATUS_MAP[data.status as keyof typeof STATUS_MAP] || { label: data.status, color: "bg-gray-400" };
  const priorityInfo = PRIORITY_MAP[data.priority as keyof typeof PRIORITY_MAP] || { label: data.priority, color: "bg-gray-400" };

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm w-full flex flex-col gap-2">
      {/* Badges for status and priority */}
      <div className="flex justify-between items-center">
        <Badge className={cn("text-white rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider", priorityInfo.color)}>
          {priorityInfo.label}
        </Badge>
        <Badge className={cn("text-white rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider", statusInfo.color)}>
          {statusInfo.label}
        </Badge>
      </div>

      {/* Title and description */}
      <div className="space-y-1 my-2">
        <h3 className="text-2xl font-bold text-slate-800">{data.title}</h3>
        <p className="text-slate-400 font-medium">{data.description}</p>
      </div>

      {/* Due date, Created date and actions */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-slate-500 font-semibold">
            <Calendar className="h-5 w-5" />
            <span>Due: {data.dueDate}</span>
          </div>
          <span className="text-[10px] text-slate-300 font-medium ml-7">Created: {data.createdAt}</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onView(data)}
            className="rounded-full h-9 w-9 bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onEdit(data)}
            className="rounded-full h-9 w-9 bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => onDelete?.(data.id)}
            className="rounded-full h-9 w-9 bg-slate-100 text-red-500 hover:bg-red-50 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
