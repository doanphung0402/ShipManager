package com.example.spring_security.entities.users.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Transient;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Embeddable
@Data
public class EmployeeDTOForCreate {
    @NotNull(message = "username must not be null")
    @Size(min = 5, max = 8, message = "username must be between 5 and 8 characters long")
    @Column(nullable = false,unique = true)
    private String username;

    @Size(min = 5, max = 8, message = "password must be between 5 and 8 characters long")
    @NotNull(message = "password must not be null")
    @Transient
    private String password;

    @NotNull(message = "body must not be null")
    @Valid
    private EmployeeDTOForEdit body;
}
