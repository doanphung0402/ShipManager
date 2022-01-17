package com.example.spring_security.security.filters;

import com.example.spring_security.error.ApiError;
import com.example.spring_security.error.FilterErrorHandler;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private FilterErrorHandler filterErrorHandler;
    @Value("${jwt.signing.key}")
    private String signingKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = request.getHeader("Authorization");
        if (jwt != null) {
            SecretKey key = Keys.hmacShaKeyFor(
                    signingKey.getBytes(StandardCharsets.UTF_8));

            try {
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                String code = (String) claims.get("code");
                String authority = (String) claims.get("authority");
                var auth = new UsernamePasswordAuthenticationToken(code, null, List.of(() -> authority));
                SecurityContextHolder.getContext().setAuthentication(auth);

            } catch (Exception exception) {
                filterErrorHandler.handleFilterError(request,response,exception);
                return;
            }
        } else {
            //fix bug using old authentication
            SecurityContextHolder.clearContext();
        }
        filterChain.doFilter(request,response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getServletPath().startsWith("/login");
    }
}
