package com.example.spring_security.controllers;

import com.example.spring_security.entities.order.Order;
import com.example.spring_security.entities.order.dto.OrderDTO;
import com.example.spring_security.services.OrderService;
import com.example.spring_security.services.ShipperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3001/", maxAge = 3600)
@RestController
public class TestAssignmentController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/assignments/{shipper_code}/pickup")
    public void assignPickup(@PathVariable String shipper_code,@RequestBody List<String> order_codes) {
        orderService.assignPickup(shipper_code, order_codes);
    }

    @PostMapping("/assignments/{shipper_code}/deliver")
    public void assignDeliver(@PathVariable String shipper_code,@RequestBody List<String> order_codes) {
        orderService.assignDeliver(shipper_code, order_codes);
    }

    @PostMapping("/assignments/{shipper_code}/return")
    public void assignReturn(@PathVariable String shipper_code,@RequestBody List<String> order_codes) {
        orderService.assignReturn(shipper_code, order_codes);
    }

    @GetMapping("/candidates/for-pickup")
    public List<OrderDTO> allCandidatesForPickup() {
        return orderService.allCandidatesForPickup().stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/candidates/for-deliver")
    public List<OrderDTO> allCandidatesForDeliver() {
        return orderService.allCandidatesForDeliver().stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/candidates/for-return")
    public List<OrderDTO> allCandidatesForReturn() {
        return orderService.allCandidatesForReturn().stream().map(OrderDTO::new).collect(Collectors.toList());
    }
}
