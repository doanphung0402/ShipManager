package com.example.spring_security.entities.users.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Transient;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Embeddable
@Data
public class CustomerDTOForCreate {
    @NotNull
    @Pattern(regexp = "^\\d{9,12}$", message = "phone number must be between 9 to 12 numbers long")
    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Size(min = 5, max = 8, message = "password must be between 5 and 8 characters long")
    @NotNull(message = "password must not be null")
    @Transient
    private String password;

    @NotNull(message = "body must not be null")
    @Valid
    private CustomerDTOForEdit body;
}
