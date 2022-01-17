package com.example.spring_security.security.filters;

import com.example.spring_security.error.FilterErrorHandler;
import com.example.spring_security.security.authentications.CustomerAuthentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.web.authentication.www.BasicAuthenticationConverter;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomerBasicAuthFilter extends OncePerRequestFilter {
    @Autowired
    private FilterErrorHandler filterErrorHandler;
    private BasicAuthenticationConverter authenticationConverter = new BasicAuthenticationConverter();
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private ApiJwtGenerator apiJwtGenerator;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            UsernamePasswordAuthenticationToken token = authenticationConverter.convert(request);
            if (token == null) {
                throw new BadCredentialsException("no authentication provided !");
            }
            CustomerAuthentication authRequest = new CustomerAuthentication(token.getName(), token.getCredentials());
            CustomerAuthentication authResult = (CustomerAuthentication) authenticationManager.authenticate(authRequest);

            apiJwtGenerator.generateApiJwt(response, authResult);
        }
        catch (Exception exception) {
            filterErrorHandler.handleFilterError(request,response,exception);
            return;
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return !request.getServletPath().equals("/login-for-customer");
    }
}
