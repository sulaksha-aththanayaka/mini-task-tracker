package com.mini_task_tracker.backend.service.impl;

import com.mini_task_tracker.backend.dto.DefaultStringResponse;
import com.mini_task_tracker.backend.dto.TaskCreateRequest;
import com.mini_task_tracker.backend.dto.TaskResponse;
import com.mini_task_tracker.backend.dto.TaskUpdateRequest;
import com.mini_task_tracker.backend.entity.Task;
import com.mini_task_tracker.backend.exception.ResourceNotFoundException;
import com.mini_task_tracker.backend.repository.TaskRepository;
import com.mini_task_tracker.backend.service.TaskService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper;

    public TaskServiceImpl(TaskRepository taskRepository, ModelMapper modelMapper) {
        this.taskRepository = taskRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public TaskResponse addTask(TaskCreateRequest taskCreateRequest) {
        Task task = modelMapper.map(taskCreateRequest, Task.class);

        Task savedTask = taskRepository.save(task);

        return modelMapper.map(savedTask, TaskResponse.class);
    }

    @Override
    public TaskResponse getTaskById(Long id) {
        return taskRepository.findById(id)
                .map(task -> modelMapper.map(task, TaskResponse.class))
                .orElseThrow(() -> new ResourceNotFoundException("Task not found: " + id));
    }

    @Override
    public Page<TaskResponse> getAllTasks(int page, int size, String sortBy, String sortDir, String search) {
        String actualSortField = sortBy.equalsIgnoreCase("priority") ? "priorityOrder" : sortBy;

        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name())
                ? Sort.by(actualSortField).ascending()
                : Sort.by(actualSortField).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Task> taskPage;

        if(search != null && !search.trim().isEmpty()){
            taskPage = taskRepository.findByTitleContainingIgnoreCase(search, pageable);
        }else{
            taskPage = taskRepository.findAll(pageable);
        }

        return taskPage.map(task -> modelMapper.map(task, TaskResponse.class));
    }

    @Override
    public TaskResponse updateTask(Long id, TaskUpdateRequest taskUpdateRequest) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found: " + id));

        if (taskUpdateRequest.getTitle() != null) {
            task.setTitle(taskUpdateRequest.getTitle());
        }
        if (taskUpdateRequest.getDescription() != null) {
            task.setDescription(taskUpdateRequest.getDescription());
        }
        if (taskUpdateRequest.getStatus() != null) {
            task.setStatus(taskUpdateRequest.getStatus());
        }
        if (taskUpdateRequest.getPriority() != null) {
            task.setPriority(taskUpdateRequest.getPriority());
        }
        if (taskUpdateRequest.getDueDate() != null) {
            task.setDueDate(taskUpdateRequest.getDueDate());
        }

        Task updatedTask = taskRepository.save(task);
        return modelMapper.map(updatedTask, TaskResponse.class);
    }

    @Override
    public DefaultStringResponse deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + id));

        taskRepository.delete(task);

        return DefaultStringResponse.builder()
                .message("Task deleted successfully with id: " + id)
                .build();
    }
}
