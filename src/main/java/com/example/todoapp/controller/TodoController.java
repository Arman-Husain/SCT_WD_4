package com.example.todoapp.controller;

import com.example.todoapp.dto.TodoDto;
import com.example.todoapp.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    // Get all todos
    @GetMapping
    public ResponseEntity<List<TodoDto>> getAllTodos() {
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    // Get todo by id
    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> getTodoById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(todoService.getTodoById(id));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Create a new todo
    @PostMapping
    public ResponseEntity<TodoDto> createTodo(@Valid @RequestBody TodoDto todoDto) {
        TodoDto createdTodo = todoService.createTodo(todoDto);
        return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
    }

    // Update an existing todo
    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@PathVariable Long id, @Valid @RequestBody TodoDto todoDto) {
        try {
            TodoDto updatedTodo = todoService.updateTodo(id, todoDto);
            return ResponseEntity.ok(updatedTodo);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete a todo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        try {
            todoService.deleteTodo(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get todos by completion status
    @GetMapping("/status")
    public ResponseEntity<List<TodoDto>> getTodosByStatus(@RequestParam boolean completed) {
        return ResponseEntity.ok(todoService.getTodosByStatus(completed));
    }

    // Search todos by title
    @GetMapping("/search")
    public ResponseEntity<List<TodoDto>> searchTodosByTitle(@RequestParam String title) {
        return ResponseEntity.ok(todoService.searchTodosByTitle(title));
    }
}