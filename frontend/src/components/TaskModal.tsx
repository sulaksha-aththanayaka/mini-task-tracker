import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { taskSchema, type TaskFormValues } from "@/schemas/TaskSchema";
import type { Task } from "@/types";

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "edit";
}

const TaskModal = ({ task, isOpen, onClose, mode }: TaskModalProps) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
      dueDate: "",
    },
    values: task
      ? {
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
        }
      : undefined,
  });

  const isReadOnly = mode === "view";

  const onSubmit = (data: TaskFormValues) => {
    console.log("Form Data Submitted:", data);
    // on update etc.
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-[32px] bg-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            {isReadOnly ? "View Task Details" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-2">
            {/* Title Field */}
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

            {/* Description Field */}
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
                      className="rounded-xl border-slate-200 min-h-[100px] resize-none focus-visible:ring-indigo-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Priority Dropdown */}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-slate-600 font-semibold">Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isReadOnly}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl border-slate-200 h-11 w-full">
                          <SelectValue placeholder="Set Priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl" position="popper">
                        <SelectItem value="LOW">Low</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="HIGH">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status Dropdown */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-slate-600 font-semibold">Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isReadOnly}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl border-slate-200 h-11 w-full">
                          <SelectValue placeholder="Set Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl" position="popper">
                        <SelectItem value="TO_DO">To Do</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Due Date Field */}
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

            {/* Footer Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 rounded-xl h-11 border-slate-200 text-slate-600 hover:bg-slate-50"
              >
                {isReadOnly ? "Close" : "Cancel"}
              </Button>

              {!isReadOnly && (
                <Button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                >
                  Save Changes
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
