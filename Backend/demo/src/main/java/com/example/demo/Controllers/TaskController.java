package com.example.demo.Controllers;

import com.example.demo.Entities.TaskEntity;
import com.example.demo.Services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/getAll")
    public ResponseEntity<List<TaskEntity>> getAll(){
        List<TaskEntity> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/create")
    public ResponseEntity<TaskEntity> create(@RequestBody TaskEntity taskEntity) {
        TaskEntity task = taskService.save(taskEntity);
        return ResponseEntity.ok(task);
    }
}