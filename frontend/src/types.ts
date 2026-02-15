export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export const TaskStatus = {
  TODO: "TO_DO",
  IN_PROGRESS: "IN_PROGRESS",
  DONE: "DONE"
};

export const Priority = {
  HIGH: "HIGH",
  MEDIUM: "MEDIUM",
  LOW: "LOW"
};

export interface TaskFormValues {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

export type Mode =  "add" | "view" | "edit";