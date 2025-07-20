package com.example.todoapp.service;

import com.example.todoapp.dto.TodoDto;
import com.example.todoapp.model.Todo;
import com.example.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // Convert Entity to DTO
    private TodoDto convertToDto(Todo todo) {
        TodoDto dto = new TodoDto();
        dto.setId(todo.getId());
        dto.setTitle(todo.getTitle());
        dto.setDescription(todo.getDescription());
        dto.setCompleted(todo.isCompleted());
        dto.setCreatedAt(todo.getCreatedAt());
        dto.setUpdatedAt(todo.getUpdatedAt());
        return dto;
    }

    // Convert DTO to Entity
    private Todo convertToEntity(TodoDto todoDto) {
        Todo todo = new Todo();
        todo.setId(todoDto.getId());
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());
        todo.setCreatedAt(todoDto.getCreatedAt() != null ? todoDto.getCreatedAt() : LocalDateTime.now());
        todo.setUpdatedAt(LocalDateTime.now());
        return todo;
    }

    // Get all todos
    public List<TodoDto> getAllTodos() {
        return todoRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Get todo by id
    public TodoDto getTodoById(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Todo not found with id: " + id));
        return convertToDto(todo);
    }

    // Create a new todo
    public TodoDto createTodo(TodoDto todoDto) {
        Todo todo = convertToEntity(todoDto);
        todo.setCreatedAt(LocalDateTime.now());
        todo.setUpdatedAt(null);
        Todo savedTodo = todoRepository.save(todo);
        return convertToDto(savedTodo);
    }

    // Update an existing todo
    public TodoDto updateTodo(Long id, TodoDto todoDto) {
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Todo not found with id: " + id));

        existingTodo.setTitle(todoDto.getTitle());
        existingTodo.setDescription(todoDto.getDescription());
        existingTodo.setCompleted(todoDto.isCompleted());
        existingTodo.setUpdatedAt(LocalDateTime.now());

        Todo updatedTodo = todoRepository.save(existingTodo);
        return convertToDto(updatedTodo);
    }

    // Delete a todo
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new EntityNotFoundException("Todo not found with id: " + id);
        }
        todoRepository.deleteById(id);
    }

    // Get todos by completion status
    public List<TodoDto> getTodosByStatus(boolean completed) {
        return todoRepository.findByCompleted(completed).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // Search todos by title
    public List<TodoDto> searchTodosByTitle(String title) {
        return todoRepository.findByTitleContainingIgnoreCase(title).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
}