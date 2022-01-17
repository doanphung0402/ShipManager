package com.example.spring_security.security.filters;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ApiJwt {
    private String jwt;
    private String role;
    private String fullName;
}
