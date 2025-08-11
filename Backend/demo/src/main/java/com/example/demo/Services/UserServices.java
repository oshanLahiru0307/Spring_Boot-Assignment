package com.example.demo.Services;

import com.example.demo.DTO.RegisterRequest;
import com.example.demo.DTO.UserResponse;
import com.example.demo.Entities.UserEntity;
import com.example.demo.Repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServices {


    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UserServices(UserRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse createUser(RegisterRequest request) {
        UserEntity user = new UserEntity();
        user.setName(request.getName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());

        UserEntity saved = repository.save(user);
        return new UserResponse(saved.getId(), saved.getName(), saved.getUsername(), saved.getEmail());
    }

    public List<UserResponse> getAllUsers() {
        return repository.findAll()
                .stream()
                .map(u -> new UserResponse(u.getId(), u.getName(), u.getUsername(), u.getEmail()))
                .toList();
    }

    public void deleteUser(int id) {
        repository.deleteById(id);
    }


}
