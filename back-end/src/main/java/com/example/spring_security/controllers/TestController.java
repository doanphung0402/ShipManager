package com.example.spring_security.controllers;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600)
@RestController
public class TestController {
    @GetMapping("/hello")
    public String hello(Authentication authentication) {
        return "hello " + authentication.getName();
    }
}
