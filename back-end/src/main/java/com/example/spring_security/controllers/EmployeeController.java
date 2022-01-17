package com.example.spring_security.controllers;

import com.example.spring_security.entities.users.Employee;
import com.example.spring_security.entities.users.GeneralUser;
import com.example.spring_security.entities.users.dto.EmployeeDTO;
import com.example.spring_security.entities.users.dto.EmployeeDTOForCreate;
import com.example.spring_security.entities.users.dto.EmployeeDTOForEdit;
import com.example.spring_security.services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3001/", maxAge = 3600)
@RestController
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/admins")
    public EmployeeDTO createAdmin(@RequestBody @Valid EmployeeDTOForCreate employeeDTO) {
        return new EmployeeDTO(employeeService.createEmployee(employeeDTO, Employee.EmployeeRole.ROLE_admin));
    }

    @PostMapping("/coordinators")
    public EmployeeDTO createCoordinator(@RequestBody @Valid EmployeeDTOForCreate employeeDTO) {
        return new EmployeeDTO(employeeService.createEmployee(employeeDTO, Employee.EmployeeRole.ROLE_coordinator));
    }

    @PostMapping("/accountants")
    public EmployeeDTO createAccountant(@RequestBody @Valid EmployeeDTOForCreate employeeDTO) {
        return new EmployeeDTO(employeeService.createEmployee(employeeDTO, Employee.EmployeeRole.ROLE_accountant));
    }

    @GetMapping("/employees")
    public List<EmployeeDTO> allEmployees() {
        return employeeService.allEmployees().stream().map(EmployeeDTO::new).collect(Collectors.toList());
    }

    @PutMapping("/employees/{code}/locked")
    public EmployeeDTO lockEmployee(@PathVariable String code) {
        return new EmployeeDTO(employeeService.changeAccountStatus(code, GeneralUser.AccountStatus.LOCKED));
    }

    @PutMapping("/employees/{code}/normal")
    public EmployeeDTO normalEmployee(@PathVariable String code) {
        return new EmployeeDTO(employeeService.changeAccountStatus(code, GeneralUser.AccountStatus.NORMAL));
    }

    @PutMapping("/employees/{code}")
    public EmployeeDTO updateEmployee(@PathVariable String code, @RequestBody @Valid EmployeeDTOForEdit employeeDTO) {
        return new EmployeeDTO(employeeService.updateEmployee(code,employeeDTO));
    }

    @GetMapping("/employees/{code}")
    public EmployeeDTO findEmployee(@PathVariable String code) {
        return new EmployeeDTO(employeeService.findEmployee(code));
    }

    @GetMapping("/employee")
    public EmployeeDTO findMine(Authentication authentication) {
        return new EmployeeDTO(employeeService.findEmployee(authentication.getName()));
    }
}
