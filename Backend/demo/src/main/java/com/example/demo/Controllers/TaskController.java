package com.example.demo.Controllers;

import com.example.demo.Entities.TaskEntity;
import com.example.demo.Services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(value = "/api/task")
@CrossOrigin
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/getAll")
    public ResponseEntity<List<TaskEntity>> getAll(){
        List<TaskEntity> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/getTaskById/{id}")
    public ResponseEntity<Optional<TaskEntity>> getTaskById(@PathVariable int id) {
        Optional<TaskEntity> task = taskService.getTaskById(id);
        if (task.isPresent()) {
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getByUserName/{username}")
    public ResponseEntity<List<Optional<TaskEntity>>> getTasksByUserName(@PathVariable String username){
        List<Optional<TaskEntity>> tasks = taskService.getTasksByUserName(username);
        return ResponseEntity.ok(tasks);
    }


    @PostMapping("/createTask")
    public ResponseEntity<TaskEntity> create(@RequestBody TaskEntity taskEntity) {
        TaskEntity task = taskService.save(taskEntity);
        return ResponseEntity.ok(task);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        String response = taskService.deleteTask(id);
        if (response.contains("deleted successfully")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(404).body(response);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TaskEntity> update(@RequestBody TaskEntity taskEntity, @PathVariable int id) {
        try {
            TaskEntity updatedTask = taskService.updateTask(taskEntity);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

}