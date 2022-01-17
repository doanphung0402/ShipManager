package com.example.spring_security.entities.users.dto;

import com.example.spring_security.entities.users.AddressInfo;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Embeddable
@Data
public class CustomerDTOForEdit {
    @NotBlank(message = "full name must not be blank")
    @Column(nullable = false)
    private String fullName;

    @NotBlank(message = "email must not be blank")
    @Email
    @Column(nullable = false)
    private String email;

    @NotNull(message = "tax code must not be null")
    @Size(min = 10, max = 14, message = "tax code must be between 10 and 14 characters long")
    @Column(nullable = false)
    private String taxCode;

    @NotNull(message = "address info must not be null")
    @Valid
    private AddressInfo addressInfo;
}
