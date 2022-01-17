package com.example.spring_security.entities.users.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Embeddable
@Data
public class EmployeeDTOForEdit {
    @NotBlank(message = "full name must not be blank")
    @Column(nullable = false)
    private String fullName;

    @NotNull(message = "phone number must not be null")
    @Pattern(regexp = "^\\d{9,12}$", message = "phone number must be between 9 to 12 numbers long")
    @Column(nullable = false)
    private String phoneNumber;
}
