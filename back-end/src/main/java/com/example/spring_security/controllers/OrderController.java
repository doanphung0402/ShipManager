package com.example.spring_security.controllers;

import com.example.spring_security.entities.order.OrderStatusInfo;
import com.example.spring_security.entities.order.dto.OrderDTO;
import com.example.spring_security.entities.order.dto.OrderDTOForCreate;
import com.example.spring_security.entities.order.dto.OrderDTOWithStatus;
import com.example.spring_security.services.OrderService;
import com.example.spring_security.utils.ShipMoneyCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3001/", maxAge = 3600)
@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/orders")
    public OrderDTO createOrder(@RequestBody @Valid OrderDTOForCreate orderDTO, Authentication authentication) {
        return new OrderDTO(orderService.createOrder(orderDTO, authentication.getName()));
    }

    @GetMapping("/orders")
    public List<OrderDTO> allOrders() {
        return orderService.allOrders().stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/orders/{code}")
    public OrderDTO findOrder(@PathVariable String code) {
        return new OrderDTO(orderService.findOrder(code));
    }

    @GetMapping("/orders_with_status/{code}")
    public OrderDTOWithStatus findOrderWithStatus(@PathVariable String code) {
        return new OrderDTOWithStatus(orderService.findOrder(code));
    }

    @PutMapping("/orders/{code}/status")
    public OrderDTO shipperUpdateStatus(@PathVariable String code, @RequestBody @Valid OrderStatusInfo orderStatusInfo) {
        //fix bug faking create logging
        return new OrderDTO(orderService.shipperUpdateStatus(code,new OrderStatusInfo(orderStatusInfo)));
    }

    @PutMapping("/orders/status/receive-at-office")
    public List<OrderDTO> receiveOrdersAtOffice(@RequestBody List<String> order_codes) {
        return orderService.receiveOrdersAtOffice(order_codes).stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @PutMapping("/orders/payment-status/collect-cod")
    public List<OrderDTO> collectCOD(@RequestBody List<String> order_codes) {
        return orderService.collectCOD(order_codes).stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @PutMapping("/orders/payment-status/return-cod/{customer_code}")
    public List<OrderDTO> returnCOD(@RequestBody List<String> order_codes, @PathVariable String customer_code) {
        return orderService.returnCOD(order_codes, customer_code).stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @PostMapping ("/ship-money")
    public ShipMoneyCalculator getShipMoney(@RequestBody @Valid ShipMoneyCalculator shipMoneyCalculator) {
        System.out.println(shipMoneyCalculator);
        return new ShipMoneyCalculator(shipMoneyCalculator);
    }
}
