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





}
