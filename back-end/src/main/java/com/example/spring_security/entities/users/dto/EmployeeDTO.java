package com.example.spring_security.entities.users.dto;

import com.example.spring_security.entities.users.Employee;
import com.example.spring_security.entities.users.GeneralUser;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EmployeeDTO extends GeneralUser {
    private String code;
    private Employee.EmployeeRole authority;
    private EmployeeDTOForEdit body;

    public EmployeeDTO(Employee employee) {
        super(employee);
        this.code = employee.getCode();
        this.authority = employee.getAuthority();
        this.body = employee.getBody().getBody();
    }
}
