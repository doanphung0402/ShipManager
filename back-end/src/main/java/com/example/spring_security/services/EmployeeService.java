package com.example.spring_security.services;

import com.example.spring_security.entities.users.Employee;
import com.example.spring_security.entities.users.GeneralUser;
import com.example.spring_security.entities.users.dto.EmployeeDTOForCreate;
import com.example.spring_security.entities.users.dto.EmployeeDTOForEdit;
import com.example.spring_security.error.AlreadyExistException;
import com.example.spring_security.error.NotFoundException;
import com.example.spring_security.repositories.EmployeeRepository;
import com.example.spring_security.utils.EmployeeCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private EmployeeCodeGenerator employeeCodeGenerator;

    public Employee makeEmployee(EmployeeDTOForCreate employeeDTO, Employee.EmployeeRole employeeRole) {
        checkUsername(employeeDTO.getUsername());
        Employee employee = new Employee(employeeDTO, employeeCodeGenerator.getCode(employeeRepository.count()), passwordEncoder, employeeRole);
        return employee;
    }

    @Transactional
    public Employee createEmployee(EmployeeDTOForCreate employeeDTO, Employee.EmployeeRole employeeRole) {
        return employeeRepository.save(makeEmployee(employeeDTO, employeeRole));
    }

    public List<Employee> allEmployees() {
        return employeeRepository.findAll();
    }

    public void checkUsername(String username) {
        if (employeeRepository.existsEmployeeByUsername(username)) {
            throw new AlreadyExistException("username already existed");
        }
    }

    public Employee findEmployee(String code) {
        return employeeRepository.findEmployeeByCode(code).orElseThrow(() -> new NotFoundException("employee with this code not exist"));
    }

    @Transactional
    public Employee changeAccountStatus(String code, GeneralUser.AccountStatus accountStatus) {
        Employee employee = findEmployee(code);
        employee.setAccountStatus(accountStatus);
        return employee;
    }

    @Transactional
    public Employee updateEmployee(String code, EmployeeDTOForEdit employeeDTO) {
        Employee employee = findEmployee(code);
        employee.update(employeeDTO);
        return employee;
    }
}
