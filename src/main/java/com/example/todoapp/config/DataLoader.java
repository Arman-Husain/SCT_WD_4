package com.example.todoapp.config;

import com.example.todoapp.model.Todo;
import com.example.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataLoader implements CommandLineRunner {

    private final TodoRepository todoRepository;

    @Autowired
    public DataLoader(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @Override
    public void run(String... args) {
        // Load sample data only if the repository is empty
        if (todoRepository.count() == 0) {
            loadSampleData();
        }
    }

    private void loadSampleData() {
        // Create sample todos
        Todo todo1 = new Todo();
        todo1.setTitle("Learn Spring Boot");
        todo1.setDescription("Study Spring Boot fundamentals and create a sample application");
        todo1.setCompleted(true);
        todo1.setCreatedAt(LocalDateTime.now().minusDays(5));
        todo1.setUpdatedAt(LocalDateTime.now().minusDays(2));

        Todo todo2 = new Todo();
        todo2.setTitle("Learn React");
        todo2.setDescription("Study React fundamentals and create a frontend application");
        todo2.setCompleted(false);
        todo2.setCreatedAt(LocalDateTime.now().minusDays(3));

        Todo todo3 = new Todo();
        todo3.setTitle("Integrate Spring Boot with React");
        todo3.setDescription("Connect the React frontend with Spring Boot backend");
        todo3.setCompleted(false);
        todo3.setCreatedAt(LocalDateTime.now().minusDays(1));

        // Save the todos
        todoRepository.save(todo1);
        todoRepository.save(todo2);
        todoRepository.save(todo3);

        System.out.println("Sample data has been loaded");
    }
}