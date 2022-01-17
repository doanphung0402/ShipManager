package com.example.spring_security.security.models;

import com.example.spring_security.entities.users.Employee;
import com.example.spring_security.entities.users.GeneralUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class EmployeeDetails implements CustomUserDetails {
    private final Employee employee;

    public EmployeeDetails(Employee employee) {
        this.employee = employee;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> employee.getAuthority().name());
    }

    @Override
    public String getPassword() {
        return employee.getEncodedPassword();
    }

    @Override
    public String getUsername() {
        return employee.getBody().getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        if (employee.getAccountStatus() == GeneralUser.AccountStatus.LOCKED) {
            return false;
        }
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String getCode() {
        return employee.getCode();
    }

    @Override
    public String getFullName() {
        return employee.getBody().getBody().getFullName();
    }
}
