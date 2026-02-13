package com.mini_task_tracker.backend.service;

import com.mini_task_tracker.backend.dto.DefaultStringResponse;
import com.mini_task_tracker.backend.dto.TaskCreateRequest;
import com.mini_task_tracker.backend.dto.TaskResponse;
import com.mini_task_tracker.backend.dto.TaskUpdateRequest;
import org.springframework.data.domain.Page;

public interface TaskService {
    TaskResponse addTask(TaskCreateRequest taskCreateRequest);

    TaskResponse getTaskById(Long id);

    Page<TaskResponse> getAllTasks(int page, int size, String sortBy, String sortDir);

    TaskResponse updateTask(Long id, TaskUpdateRequest taskUpdateRequest);

    DefaultStringResponse deleteTask(Long id);
}
