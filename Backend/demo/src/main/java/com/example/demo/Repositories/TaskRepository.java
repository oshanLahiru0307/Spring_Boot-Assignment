package com.example.demo.Repositories;

import com.example.demo.Entities.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<TaskEntity, Integer> {

    List<Optional<TaskEntity>> findByUserName(String username);
}
