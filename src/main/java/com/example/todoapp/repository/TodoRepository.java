package com.example.todoapp.repository;

import com.example.todoapp.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    
    // Find todos by completion status
    List<Todo> findByCompleted(boolean completed);
    
    // Find todos containing the given title (case-insensitive)
    List<Todo> findByTitleContainingIgnoreCase(String title);
}