package com.example.spring_security.security.models;

import com.example.spring_security.entities.users.Customer;
import com.example.spring_security.entities.users.GeneralUser;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class CustomerDetails implements CustomUserDetails {
    private final Customer customer;

    public CustomerDetails(Customer customer) {
        this.customer = customer;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "ROLE_customer");
    }

    @Override
    public String getPassword() {
        return customer.getEncodedPassword();
    }

    @Override
    public String getUsername() { return customer.getBody().getPhoneNumber(); }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        if (customer.getAccountStatus() == GeneralUser.AccountStatus.LOCKED) {
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
        return customer.getCode();
    }

    @Override
    public String getFullName() {
        return customer.getBody().getBody().getFullName();
    }
}
