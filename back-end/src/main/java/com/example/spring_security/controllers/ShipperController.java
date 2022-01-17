package com.example.spring_security.controllers;

import com.example.spring_security.entities.order.OrdersAndCOD;
import com.example.spring_security.entities.order.dto.OrderDTO;
import com.example.spring_security.entities.users.dto.EmployeeDTO;
import com.example.spring_security.entities.users.dto.EmployeeDTOForCreate;
import com.example.spring_security.services.ShipperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3001/", maxAge = 3600)
@RestController
public class ShipperController {
    @Autowired
    private ShipperService shipperService;

    @PostMapping("/shippers")
    public EmployeeDTO createShipper(@RequestBody @Valid EmployeeDTOForCreate employeeDTO) {
        return new EmployeeDTO(shipperService.createShipper(employeeDTO));
    }

    @GetMapping("/shippers")
    public List<EmployeeDTO> allShippers() {
        return shipperService.allShippers().stream().map(EmployeeDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/shippers/{code}")
    public EmployeeDTO findShipper(@PathVariable String code) {
        return new EmployeeDTO(shipperService.findShipper(code));
    }

    @GetMapping("/shipper/pickups")
    List<OrderDTO> findMyPickups(Authentication authentication) {
        return shipperService.findShipperPickups(authentication.getName()).stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/shipper/delivers")
    List<OrderDTO> findMyDelivers(Authentication authentication) {
        return shipperService.findShipperDelivers(authentication.getName()).stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/shipper/returns")
    List<OrderDTO> findMyReturns(Authentication authentication) {
        return shipperService.findShipperReturns(authentication.getName()).stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/shipper/{code}/orders-to-office")
    List<OrderDTO> findOrdersShipperMustTakeToOffice(@PathVariable String code) {
        return shipperService.findOrdersShipperMustTakeToOffice(code).stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/shipper/{code}/orders-and-cod-to-accountant")
    public OrdersAndCOD findOrdersShipperMustGiveCodToAccountant(@PathVariable String code) {
        return new OrdersAndCOD(shipperService.findOrdersShipperGiveCodToAccountant(code));
    }
}
