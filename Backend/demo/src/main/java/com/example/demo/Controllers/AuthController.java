package com.example.demo.Controllers;

import com.example.demo.DTO.LoginRequest;
import com.example.demo.DTO.LoginResponse;
import com.example.demo.DTO.RegisterRequest;
import com.example.demo.Services.JWTService;
import com.example.demo.Services.UserServices;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping(value = "/auth")
@CrossOrigin
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTService jwtUtil;
    private final UserServices userService;

    public AuthController(AuthenticationManager authenticationManager, JWTService jwtUtil, UserServices userService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        userService.createUser(request);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<HashMap<String, String>> login(@RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        
        String token = jwtUtil.getJWTToken(request.getUsername());
        String user = request.getUsername();
        String email = userService.findUserByUsername(user).getEmail();
        HashMap<String,String> res = new HashMap<String, String>();
        res.put("token", token);
        res.put("username", user);
        res.put("email", email);
        return ResponseEntity.ok(res);
    }

}
