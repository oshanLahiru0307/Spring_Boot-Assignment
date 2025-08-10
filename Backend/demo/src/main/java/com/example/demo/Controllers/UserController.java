package com.example.demo.Controllers;

import com.example.demo.DTO.UserResponse;
import com.example.demo.Services.UserServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/api/users")
public class UserController {

    private final UserServices userService;

    public UserController(UserServices userService) {
        this.userService = userService;
    }

    @GetMapping("/getAllUsers")
    public List<UserResponse> getAll() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public UserResponse getUserById(@PathVariable int id) {
        return userService.getAllUsers().stream()
                .filter(user -> user.getId() == id)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("User not found"));
    }


    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        userService.deleteUser(id);
        return "User deleted!";
    }
}
