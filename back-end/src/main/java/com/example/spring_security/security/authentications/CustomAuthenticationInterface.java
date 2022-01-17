package com.example.spring_security.security.authentications;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public interface CustomAuthenticationInterface {
    String getName();
    Collection<? extends GrantedAuthority> getAuthorities();
    String getFullName();
}
