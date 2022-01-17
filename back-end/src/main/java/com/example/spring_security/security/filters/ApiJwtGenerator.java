package com.example.spring_security.security.filters;

import com.example.spring_security.security.authentications.CustomAuthenticationInterface;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Map;

@Component
public class ApiJwtGenerator {

    @Value("${jwt.signing.key}")
    private String signingKey;

    private String getRole(Collection<? extends GrantedAuthority> authorities) {
        for (GrantedAuthority ga : authorities) {
            return ga.getAuthority();
        }
        return "";
    }

    public void generateApiJwt(HttpServletResponse response, CustomAuthenticationInterface authResult) throws IOException {

        SecretKey key = Keys.hmacShaKeyFor(
                signingKey.getBytes(StandardCharsets.UTF_8));

        String jwt = Jwts.builder()
                .setClaims(Map.of("code", authResult.getName(), "authority", getRole(authResult.getAuthorities())))
                .signWith(key)
                .compact();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        ApiJwt apiJwt = new ApiJwt(jwt,getRole(authResult.getAuthorities()).substring(5), authResult.getFullName());
        ObjectMapper mapper = new ObjectMapper();
        PrintWriter out = response.getWriter();
        out.print(mapper.writeValueAsString(apiJwt));
        out.flush();
    }
}
