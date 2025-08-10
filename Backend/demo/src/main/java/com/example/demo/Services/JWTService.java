package com.example.demo.Services;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.Date;

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

    public String getJWTToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour expiration
                .signWith(secretkey)
                .compact();

    }

    public String getUserName(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretkey)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractUsername(String token) {
        return Jwts.parser().setSigningKey(secretkey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }






}
