package com.example.spring_security.entities.users.dto;

import com.example.spring_security.entities.order.Order;
import com.example.spring_security.entities.order.OrdersAndCOD;
import com.example.spring_security.entities.users.Customer;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.stream.Collectors;

@Data
@NoArgsConstructor
public class CustomerDTOWithCOD extends CustomerDTO {
    private OrdersAndCOD ordersMustReturnCod;

    public CustomerDTOWithCOD(Customer customer) {
        super(customer);
        this.ordersMustReturnCod = new OrdersAndCOD(customer.getOrders().stream().filter(Order::isMustReturnCod).collect(Collectors.toList()));
    }
}
