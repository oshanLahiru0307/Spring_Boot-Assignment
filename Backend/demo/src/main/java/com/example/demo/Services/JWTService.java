package com.example.demo.Services;

import io.jsonwebtoken.security.Keys;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

public class JWTService {

    private final SecretKey secretkey;

    public JWTService() {
        try{
            SecretKey k = KeyGenerator.getInstance("HmacSHA256").generateKey();
            secretkey = Keys.hmacShaKeyFor(k.getEncoded());
        }catch(Exception e) {
            throw new RuntimeException("Error initializing JWTService", e);
        }
    }

}
