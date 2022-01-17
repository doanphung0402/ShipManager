package com.example.spring_security.entities.order;

import com.example.spring_security.entities.order.dto.OrderDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class OrdersAndCOD {
    private List<OrderDTO> orders;
    private long COD;

    public OrdersAndCOD(List<Order> orders) {
        COD = 0;
        this.orders = new ArrayList<>();
        orders.stream().forEach(order -> {
            this.COD += order.getBody().getCodMoney();
            this.orders.add(new OrderDTO(order));
        });
    }
}
