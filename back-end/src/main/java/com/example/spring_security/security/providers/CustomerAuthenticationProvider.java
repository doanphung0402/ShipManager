package com.example.spring_security.security.providers;

import com.example.spring_security.security.authentications.CustomerAuthentication;
import com.example.spring_security.security.models.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

public class CustomerAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    @Qualifier("customerDetailsService")
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String password = (String) authentication.getCredentials();
        CustomUserDetails userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(username);
        if (userDetails != null) {
            if (passwordEncoder.matches(password,userDetails.getPassword())) {
                if (!userDetails.isAccountNonLocked()) {
                    throw new BadCredentialsException("your account's been locked");
                }
                return new CustomerAuthentication(userDetails.getCode(),null,userDetails.getAuthorities(),userDetails.getFullName());
            }
        }
        throw new BadCredentialsException("password uncorrect !");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return CustomerAuthentication.class.equals(authentication);
    }
}
