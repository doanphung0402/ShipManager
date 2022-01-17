package com.example.spring_security.utils;

import com.example.spring_security.entities.users.AddressInfo;
import lombok.Data;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@Data
public class ShipMoneyCalculator {
    @NotNull
    private AddressInfo.AreaName origin;
    @NotNull
    private AddressInfo.AreaName destination;
    @Positive
    private double weight;

    private int shipMoney;

    public ShipMoneyCalculator(AddressInfo.AreaName origin, AddressInfo.AreaName destination, double weight) {
        this.origin = origin;
        this.destination = destination;
        this.weight = weight;
        this.shipMoney = 1000;
    }

    public ShipMoneyCalculator(ShipMoneyCalculator shipMoneyCalculator) {
        this(shipMoneyCalculator.getOrigin(), shipMoneyCalculator.getDestination(), shipMoneyCalculator.weight);
    }
}
