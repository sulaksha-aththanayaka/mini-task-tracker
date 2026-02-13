package com.mini_task_tracker.backend.dto;

import com.mini_task_tracker.backend.entity.Priority;
import com.mini_task_tracker.backend.entity.TaskStatus;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskUpdateRequest {
    @Size(min = 1, max = 100)
    private String title;

    @Size(max = 500)
    private String description;

    private TaskStatus status;

    private Priority priority;

    private LocalDate dueDate;
}
