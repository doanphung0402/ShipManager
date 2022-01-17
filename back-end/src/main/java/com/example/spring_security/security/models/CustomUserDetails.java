package com.example.spring_security.security.models;

import org.springframework.security.core.userdetails.UserDetails;

public interface CustomUserDetails extends UserDetails {
    String getCode();
    String getFullName();
}
