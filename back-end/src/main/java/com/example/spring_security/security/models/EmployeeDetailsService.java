package com.example.spring_security.security.models;
import com.example.spring_security.entities.users.Employee;
import com.example.spring_security.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("employeeDetailsService")
public class EmployeeDetailsService implements UserDetailsService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Employee> e = employeeRepository.findEmployeeByUsername(username);
        Employee employee = e.orElseThrow(() -> new UsernameNotFoundException("username not found !"));
        EmployeeDetails employeeDetails = new EmployeeDetails(employee);
        return employeeDetails;
    }
}
