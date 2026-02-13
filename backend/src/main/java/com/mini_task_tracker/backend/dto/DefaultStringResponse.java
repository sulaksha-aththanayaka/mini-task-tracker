package com.mini_task_tracker.backend.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class DefaultStringResponse {
    private String message;
}
