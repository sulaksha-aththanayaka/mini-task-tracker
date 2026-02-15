import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { taskSchema, type TaskFormValues } from "@/schemas/TaskSchema";
import type { Mode, Task } from "@/types";
import { useEffect } from "react";
import { useTaskMutations } from "@/hooks/useTasks";

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onEditClick?: () => void;
  mode: Mode;
}

const TaskModal = ({ task, isOpen, isLoading, onClose, onEditClick, mode }: TaskModalProps) => {
  const { createTask, isCreating, updateTask, isUpdating } = useTaskMutations();

  console.log("task: ", task);
  console.log("mode: ", mode);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (task && (mode === "edit" || mode === "view")) {
        form.reset({
          title: task.title || "",
          description: task.description || "",
          status: task.status || "",
          priority: task.priority || "",
          dueDate: task.dueDate || "",
        });
      } else if (mode === "add") {
        // Reset to empty for add mode
        form.reset({
          title: "",
          description: "",
          status: "",
          priority: "",
          dueDate: "",
        });
      }
    }
  }, [task, isOpen, mode, form]);

  const isReadOnly = mode === "view";
  const isAddMode = mode === "add";

  const onSubmit = (data: TaskFormValues) => {
    if (isAddMode) {
      createTask(data, {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      });
    } else {
      if (task?.id) {
        updateTask(
          { id: task.id, data },
          {
            onSuccess: () => {
              onClose();
            },
          },
        );
      } else {
        console.error("Cannot update: Task ID is missing");
        onClose();
      }
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent key={task?.id || 'new-task'} className="sm:max-w-[500px] rounded-[32px] bg-white border-none shadow-2xl">
        <DialogTitle className="sr-only">View, Add or Edit Task</DialogTitle>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            <p className="text-slate-500 animate-pulse">Fetching details...</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-800">
                {isReadOnly ? "View Task Details" : isAddMode ? "Add New Task" : "Edit Task"}
              </DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-semibold">Task Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. Design UI Mockups"
                          disabled={isReadOnly}
                          className="rounded-xl border-slate-200 h-11 focus-visible:ring-indigo-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-semibold">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe the task details..."
                          disabled={isReadOnly}
                          className="rounded-xl border-slate-200 max-h-[100px] resize-none focus-visible:ring-indigo-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4 w-full">
                  {/* Priority dropdown */}
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-slate-600 font-semibold">Priority</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={isReadOnly}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-slate-200 h-11 w-full cursor-pointer hover:opacity-70">
                              <SelectValue placeholder="Set Priority" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl" position="popper">
                            <SelectItem value="LOW" className="cursor-pointer">Low</SelectItem>
                            <SelectItem value="MEDIUM" className="cursor-pointer">Medium</SelectItem>
                            <SelectItem value="HIGH" className="cursor-pointer">High</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status dropdown */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-slate-600 font-semibold">Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value} disabled={isReadOnly}>
                          <FormControl>
                            <SelectTrigger className="rounded-xl border-slate-200 h-11 w-full cursor-pointer hover:opacity-70">
                              <SelectValue placeholder="Set Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="rounded-xl" position="popper">
                            <SelectItem value="TODO">To Do</SelectItem>
                            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                            <SelectItem value="DONE">Done</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Due date */}
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-600 font-semibold">Due Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          disabled={isReadOnly}
                          className="rounded-xl border-slate-200 h-11 focus-visible:ring-indigo-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Footer actions */}
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 rounded-xl h-11 border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    {isReadOnly ? "Close" : "Cancel"}
                  </Button>

                  {isReadOnly && (
                    <Button
                      type="button"
                      onClick={onEditClick}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 shadow-lg shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
                    >
                      Edit
                    </Button>
                  )}

                  {!isReadOnly && (
                    <Button
                      type="submit"
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 shadow-lg shadow-indigo-200 transition-all active:scale-95 cursor-pointer"
                    >
                      {isCreating || isUpdating ? "Saving..." : mode === "add" ? "Create Task" : "Save Changes"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </>
        )}
        <DialogDescription className="sr-only">This modal is to view, add or edit tasks</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
