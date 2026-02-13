package com.mini_task_tracker.backend.controller;

import com.mini_task_tracker.backend.dto.DefaultStringResponse;
import com.mini_task_tracker.backend.dto.TaskCreateRequest;
import com.mini_task_tracker.backend.dto.TaskResponse;
import com.mini_task_tracker.backend.dto.TaskUpdateRequest;
import com.mini_task_tracker.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
@Validated
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<TaskResponse> addTask(@RequestBody TaskCreateRequest taskCreateRequest) {
        TaskResponse taskResponse = taskService.addTask(taskCreateRequest);
        return ResponseEntity.ok(taskResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id) {
        TaskResponse taskResponse = taskService.getTaskById(id);
        return ResponseEntity.ok(taskResponse);
    }

    @GetMapping
    public ResponseEntity<Page<TaskResponse>> getAllTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDir) {
        Page<TaskResponse> tasks = taskService.getAllTasks(page, size, sortBy, sortDir);
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id, @Valid @RequestBody TaskUpdateRequest taskUpdateRequest){
        TaskResponse taskResponse = taskService.updateTask(id, taskUpdateRequest);
        return ResponseEntity.ok(taskResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DefaultStringResponse> deleteTask(@PathVariable Long id){
        DefaultStringResponse response = taskService.deleteTask(id);
        return ResponseEntity.ok(response);
    }

}
