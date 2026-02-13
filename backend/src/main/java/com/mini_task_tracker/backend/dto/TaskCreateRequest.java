package com.mini_task_tracker.backend.dto;

import com.mini_task_tracker.backend.entity.Priority;
import com.mini_task_tracker.backend.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskCreateRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private TaskStatus status;

    private Priority priority;

    private LocalDate dueDate;
}
