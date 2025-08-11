package com.example.demo.Services;

import com.example.demo.Entities.TaskEntity;
import com.example.demo.Repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskEntity> getAllTasks(){
        return taskRepository.findAll();
    }

    public Optional<TaskEntity> getTaskById(int id){
        return taskRepository.findById(id);
    }

    public TaskEntity save(TaskEntity taskEntity) {
        taskRepository.save(taskEntity);
        return taskEntity;
    }

    public List<Optional<TaskEntity>> getTasksByUserName(String username) {
        List<Optional<TaskEntity>> tasks = taskRepository.findByUserName(username);
        if(tasks.isEmpty()) {
            throw new RuntimeException("No tasks found for user: " + username);
        }
        return tasks;
    }

    public TaskEntity updateTask(TaskEntity taskEntity) {
        int taskId = taskEntity.getId();
        TaskEntity optionalTask = taskRepository.findById(taskId).orElse(null);
        if (optionalTask != null) {
            optionalTask.setTaskName(taskEntity.getTaskName());
            optionalTask.setDescription(taskEntity.getDescription());
            optionalTask.setUserName(taskEntity.getUserName());
            taskRepository.save(optionalTask);
            return optionalTask;
        } else {
            throw new RuntimeException("Task with ID " + taskId + " does not exist.");
        }
    }


    public String deleteTask(int id){
        if (taskRepository.existsById(id)) {
            taskRepository.deleteById(id);
            return "Task with ID " + id + " deleted successfully.";
        } else {
            return "Task with ID " + id + " does not exist.";
        }
    }





}
