package com.example.spring_security.entities.order.dto;

import com.example.spring_security.entities.CreateLogging;
import com.example.spring_security.entities.order.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@NoArgsConstructor
public class OrderDTO extends CreateLogging {
    private String code;
    private Receiver sender;
    private int pickupNumberOfTimes;
    private int deliverNumberOfTimes;
    private OrderStatusInfo.OrderStatus status;
    private OrderDTOForCreate body;
    private AssignmentDTO assignment;
    private PaymentStatusInfo paymentStatusInfo;
    private int shipMoney;
    private int shipper_id ;
    public OrderDTO(Order order) {
        super(order);
        this.code = order.getCode();
        this.sender = Receiver.builder()
                .fullName(order.getCustomer().getBody().getBody().getFullName())
                .phoneNumber(order.getCustomer().getBody().getPhoneNumber())
                .addressInfo(order.getCustomer().getBody().getBody().getAddressInfo())
                .build();
        this.pickupNumberOfTimes = order.getPickupNumberOfTimes();
        this.deliverNumberOfTimes = order.getDeliverNumberOfTimes();
        this.status = order.getStatus();
        this.body = order.getBody();
        if (order.getAssignment() != null) {
            this.assignment = new AssignmentDTO(order.getAssignment());
        }
        this.paymentStatusInfo = order.getPaymentStatusInfo();
        this.shipMoney = order.getShipMoney();
        this.body.setProductsList(new ArrayList<String>(Arrays.asList(this.body.getProductsDescription().split(","))));
    }
}
