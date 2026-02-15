import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import { taskApi } from "@/api/taskApi";
import type { Task } from "@/types";
import { useEffect, useState } from "react";
import type { TaskFormValues } from "@/schemas/TaskSchema";

interface PaginatedResponse {
  content: Task[];
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  number: number;
  size: number;
}

// Get all tasks
export const useTasks = (
  page: number = 0,
  size: number = 10,
  sortBy: string = "createdAt",
  sortDir: string = "desc",
  search: string = "",
) => {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading, isPlaceholderData, isFetching, isError, error } = useQuery<PaginatedResponse>({
    queryKey: ["tasks", page, size, sortBy, sortDir, debouncedSearch],
    queryFn: () => taskApi.fetchTasks(page, size, sortBy, sortDir, debouncedSearch),
    placeholderData: keepPreviousData,
  });

  return {
    tasks: data?.content ?? [],

    pagination: {
      totalElements: data?.totalElements ?? 0,
      totalPages: data?.totalPages ?? 0,
      isFirst: data?.first ?? true,
      isLast: data?.last ?? true,
      currentPage: data?.number ?? 0,
    },

    isLoading,
    isFetching,
    isPlaceholderData,
    isError,
    error,
  };
};

// Get task by id
export const useTaskDetail = (taskId: number | null) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: () => taskApi.fetchTaskById(taskId!),
    enabled: !!taskId,
    staleTime: 0,
  });
};

// Create, update and delete
export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (newTask: TaskFormValues) => taskApi.create(newTask),
    onSuccess: () => {!
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("Failed to create task:", error);
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: TaskFormValues }) => 
      taskApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task", variables.id] }); // To show updated data
    },
    onError: (error) => {
      console.error("Failed to update task:", error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => taskApi.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.removeQueries({ queryKey: ["task", id] });
    },
    onError: (error) => {
      console.error("Failed to delete task:", error);
    }
  });

  return {
    createTask: createMutation.mutate,
    isCreating: createMutation.isPending,
    updateTask: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteTask: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending
  };
};