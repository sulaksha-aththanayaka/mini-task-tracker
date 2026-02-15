import { api } from "@/lib/axios";
import type { Task, TaskFormValues } from "@/types";

export const taskApi = {
  fetchTasks: async (page: number, size: number, sortBy: string, sortDir: string, search: string) => {
    const { data } = await api.get(`/tasks`, {
      params: {
        page: page,
        size: size,
        sortBy: sortBy,
        sortDir: sortDir,
        search: search
      },
    });
    return data;
  },

  getAll: async () => {
    const { data } = await api.get<Task[]>("/tasks");
    return data;
  },

  fetchTaskById: async (id: number) => {
    const { data } = await api.get<Task>(`/tasks/${id}`);
    return data;
  },

  create: async (task: TaskFormValues) => {
    const { data } = await api.post<Task>("/tasks", task);
    return data;
  },

  update: async (id: number, task: TaskFormValues) => {
    const { data } = await api.put<Task>(`/tasks/${id}`, task);
    return data;
  },

  delete: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  },
};
