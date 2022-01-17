package com.example.spring_security.security.configs;

import com.example.spring_security.security.filters.CustomerBasicAuthFilter;
import com.example.spring_security.security.filters.EmployeeBasicAuthFilter;
import com.example.spring_security.security.filters.JwtAuthFilter;
import com.example.spring_security.security.providers.CustomerAuthenticationProvider;
import com.example.spring_security.security.providers.EmployeeAuthenticationProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
public class WebAuthorizationConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(employeeAuthenticationProvider())
                .authenticationProvider(customerAuthenticationProvider());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.addFilterAt(customerBasicAuthFilter(), BasicAuthenticationFilter.class)
                .addFilterAt(employeeBasicAuthFilter(), BasicAuthenticationFilter.class)
                .addFilterAfter(jwtAuthFilter(), BasicAuthenticationFilter.class);
        //---------------------------------
        http.authorizeRequests()
                .mvcMatchers(HttpMethod.POST, "/accountants").hasRole("admin")
                .mvcMatchers(HttpMethod.POST, "/managers").hasRole("admin")
                .mvcMatchers(HttpMethod.POST, "/shippers").hasRole("admin")
                .mvcMatchers("/customers/{id}").hasAnyRole("admin", "accountant")
                .mvcMatchers("/customer/**").hasRole("customer")
                .mvcMatchers("/shippers/{id}").hasAnyRole("admin", "manager")
                .mvcMatchers("/shipper").hasRole("shipper")
                .anyRequest().permitAll();

        http.cors(c -> {
            CorsConfigurationSource cs = r -> {
                CorsConfiguration cc = new CorsConfiguration();
                cc.setAllowedOrigins(List.of("*"));
                cc.setAllowedMethods(List.of("*"));
                cc.setAllowedHeaders(List.of("*"));
                return cc;
            };
            c.configurationSource(cs);
        });
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public EmployeeBasicAuthFilter employeeBasicAuthFilter() {
        return new EmployeeBasicAuthFilter();
    }

    @Bean
    public CustomerBasicAuthFilter customerBasicAuthFilter() {
        return new CustomerBasicAuthFilter();
    }

    @Bean
    public JwtAuthFilter jwtAuthFilter() {
        return new JwtAuthFilter();
    }

    @Bean
    public EmployeeAuthenticationProvider employeeAuthenticationProvider() {
        return new EmployeeAuthenticationProvider();
    }

    @Bean
    public CustomerAuthenticationProvider customerAuthenticationProvider() {
        return new CustomerAuthenticationProvider();
    }
}
