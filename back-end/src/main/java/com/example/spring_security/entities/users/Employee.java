package com.example.spring_security.entities.users;

import com.example.spring_security.entities.users.dto.EmployeeDTOForCreate;
import com.example.spring_security.entities.users.dto.EmployeeDTOForEdit;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@NoArgsConstructor
@Data
public class Employee extends GeneralUser {
    public enum EmployeeRole {
        ROLE_admin,
        ROLE_coordinator,
        ROLE_shipper,
        ROLE_accountant
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String encodedPassword;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EmployeeRole authority;

    @NotNull
    @Valid
    private EmployeeDTOForCreate body;

    public Employee(EmployeeDTOForCreate body, String code, PasswordEncoder passwordEncoder, EmployeeRole authority) {
        this.body = body;
        this.code = code;
        this.encodedPassword = passwordEncoder.encode(body.getPassword());
        this.authority = authority;
    }

    public void update(EmployeeDTOForEdit body) {
        this.body.setBody(body);
    }

    public Employee(Employee employee) {
        this.code = employee.getCode();
        this.encodedPassword = employee.getEncodedPassword();
        this.authority = employee.getAuthority();
        this.body = employee.getBody();
    }

    @PreUpdate
    public void preUpdate() {
        this.body.setPassword("*****");
    }
}
