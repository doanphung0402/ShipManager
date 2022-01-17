package com.example.spring_security.security.authentications;

import lombok.Data;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class EmployeeAuthentication extends UsernamePasswordAuthenticationToken implements CustomAuthenticationInterface {

    private String fullName;

    public EmployeeAuthentication(Object principal, Object credentials) {
        super(principal, credentials);
    }

    public EmployeeAuthentication(Object principal, Object credentials, Collection<? extends GrantedAuthority> authorities, String fullName) {
        super(principal, credentials, authorities);
        this.fullName = fullName;
    }

    public String getFullName() {
        return fullName;
    }
}
