package com.example.spring_security.entities.order;

import com.example.spring_security.entities.users.AddressInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Receiver {
    @NotBlank(message = "full name must not be blank")
    @Column(nullable = false)
    private String fullName;

    @NotNull(message = "phone number must not be null")
    @Pattern(regexp = "^\\d{9,12}$", message = "phone number must be between 9 to 12 numbers long")
    @Column(nullable = false)
    private String phoneNumber;

    @NotNull(message = "address info must not be null")
    @Valid
    private AddressInfo addressInfo;
}
