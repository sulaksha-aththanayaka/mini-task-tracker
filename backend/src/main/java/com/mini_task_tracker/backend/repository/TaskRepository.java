package com.mini_task_tracker.backend.repository;

import com.mini_task_tracker.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}
