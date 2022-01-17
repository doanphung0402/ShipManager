package com.example.spring_security.entities.order.dto;

import com.example.spring_security.entities.order.Order;
import com.example.spring_security.entities.order.OrderStatusInfo;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class OrderDTOWithStatus extends OrderDTO{
    private List<OrderStatusInfo> orderStatusInfos;

    public OrderDTOWithStatus(Order order) {
        super(order);
        this.orderStatusInfos = order.getOrderStatusInfos();
    }
}
