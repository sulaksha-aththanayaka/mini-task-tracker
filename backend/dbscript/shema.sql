CREATE DATABASE IF NOT EXISTS task_tracker_db;

USE task_tracker_db;

CREATE TABLE Task (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'TODO',
    priority VARCHAR(50) DEFAULT 'MEDIUM',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO Task (title, description, status, priority, due_date)
VALUES
('Complete Assignment', 'Finish the full-stack project', 'IN_PROGRESS', 'HIGH', '2026-02-15'),
('Review Documentation', 'Read the Spring Boot and React docs', 'DONE', 'MEDIUM', '2026-02-10'),
('Submit Link', 'Email the Git repository link to the team', 'TODO', 'LOW', '2026-02-16');