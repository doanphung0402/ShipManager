package com.example.spring_security.entities.order.dto;

import com.example.spring_security.entities.order.Receiver;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.Transient;
import javax.validation.Valid;
import javax.validation.constraints.*;
import java.util.List;

@Embeddable
@Data
public class OrderDTOForCreate {
    @Valid
    @NotNull
    private Receiver receiver;

    @Positive(message = "must have positive weight")
    private double weight;

    @PositiveOrZero(message = "must have positive or zero cod money")
    private int codMoney;

    private String note;

    @JsonIgnore
    private String productsDescription;

    @Transient
    @NotEmpty(message = "list products must not be empty")
    private List<String> productsList;
}
