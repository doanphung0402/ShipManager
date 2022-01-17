package com.example.spring_security.entities.order;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Embeddable
@Data
@NoArgsConstructor
public class OrderStatusInfo {
    public enum OrderStatus {
        CANCELLED,
        READY_FOR_PICKUP,
        PICKING,
        PICKUP,
        PICKUP_FAIL,
        PICKUP_FAIL_WAIT_FOR_PICKUP,
        PICKUP_FAIL_CANCELLED,
        PICKUP_SUCCESS,
        RECEIVED_AT_OFFICE,
        RECEIVED_AT_OFFICE_WAIT_FOR_DELIVER,
        DELIVERING,
        DELIVER_FAIL,
        DELIVER_SUCCESS,
        RECEIVED_AT_OFFICE_WAIT_FOR_RETURN,
        QUERY_FOR_RETURNING,
        RETURNING,
        RETURN_SUCCESS,
        RETURN_FAIL
    }
    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    private LocalDateTime createdAt;
    private String createdBy;

    public OrderStatusInfo(OrderStatus orderStatus) {
        this.createdAt = LocalDateTime.now();
        this.createdBy = SecurityContextHolder.getContext().getAuthentication().getName();
        this.orderStatus = orderStatus;
    }

    public OrderStatusInfo(OrderStatusInfo orderStatusInfo) {
        this(orderStatusInfo.getOrderStatus());
    }
}
