package com.example.demo.Services;

import com.example.demo.Entities.TaskEntity;
import com.example.demo.Repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<TaskEntity> getAllTasks(){
        return taskRepository.findAll();
    }

    public TaskEntity save(TaskEntity taskEntity) {
        taskRepository.save(taskEntity);
        return taskEntity;
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
