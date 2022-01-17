package com.example.spring_security.controllers;

import com.example.spring_security.entities.order.dto.OrderDTO;
import com.example.spring_security.entities.order.dto.OrderDTOForCreate;
import com.example.spring_security.entities.users.GeneralUser;
import com.example.spring_security.entities.users.dto.*;
import com.example.spring_security.services.CustomerService;
import com.example.spring_security.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3001/", maxAge = 3600)
@RestController
public class CustomerController {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private OrderService orderService;

    @PostMapping("/customers")
    public CustomerDTO createCustomer(@RequestBody @Valid CustomerDTOForCreate customerDTO) {
        return new CustomerDTO(customerService.createCustomer(customerDTO));
    }

    @GetMapping("/customers")
    public List<CustomerDTO> allCustomers() {
        return customerService.allCustomers().stream().map(CustomerDTO::new).collect(Collectors.toList());
    }

    @GetMapping("/customers/{code}")
    public CustomerDTO findCustomer(@PathVariable String code) {
        return new CustomerDTO(customerService.findCustomer(code));
    }

    @GetMapping("/customer")
    public CustomerDTO findMine(Authentication authentication) {
        return new CustomerDTO(customerService.findCustomer(authentication.getName()));
    }

    @GetMapping("/customer-with-money")
    public CustomerDTO findMineWithMoneyChangeLogs(Authentication authentication) {
        return new CustomerDTOWithMoneyLogs(customerService.findCustomer(authentication.getName()));
    }

    @PutMapping("/customers/{code}/locked")
    public CustomerDTO lockCustomer(@PathVariable String code) {
        return new CustomerDTO(customerService.changeAccountStatus(code, GeneralUser.AccountStatus.LOCKED));
    }

    @PutMapping("/customers/{code}/normal")
    public CustomerDTO normalCustomer(@PathVariable String code) {
        return new CustomerDTO(customerService.changeAccountStatus(code, GeneralUser.AccountStatus.NORMAL));
    }

    @PutMapping("/customers/{code}")
    public CustomerDTO updateCustomer(@PathVariable String code, @RequestBody @Valid CustomerDTOForEdit customerDTO) {
        return new CustomerDTO(customerService.updateCustomer(code, customerDTO));
    }

    @PutMapping("/customer")
    public CustomerDTO updateMine(@RequestBody @Valid CustomerDTOForEdit customerDTO, Authentication authentication) {
        return new CustomerDTO(customerService.updateCustomer(authentication.getName(), customerDTO));
    }

    @PostMapping("/customers/{code}/orders")
    public OrderDTO createOrder(@PathVariable String code, @RequestBody @Valid OrderDTOForCreate orderDTO) {
        return new OrderDTO(orderService.createOrder(orderDTO, code));
    }


    @GetMapping("/customer/orders")
    public List<OrderDTO> findMyOrders(Authentication authentication) {
        return customerService.findCustomerOrders(authentication.getName()).stream().map(OrderDTO::new).collect(Collectors.toList());
    }

    @PutMapping("/customers/{code}/deposit/{money}")
    public CustomerDTO deposit(@PathVariable String code, @PathVariable long money) {
        return new CustomerDTO(customerService.deposit(code, money));
    }

    @PutMapping("/customers/{code}/withdraw/{money}")
    public CustomerDTO withdraw(@PathVariable String code, @PathVariable long money) {
        return new CustomerDTO(customerService.withdraw(code, money));
    }

    @GetMapping("/customers-with-cod")
    public List<CustomerDTOWithCOD> allCustomersWithCod() {
        return customerService.allCustomers().stream().map(CustomerDTOWithCOD::new).collect(Collectors.toList());
    }

    @GetMapping("/customers-with-cod/{code}")
    public CustomerDTOWithCOD findCustomerWithCod(@PathVariable String code) {
        return new CustomerDTOWithCOD(customerService.findCustomer(code));
    }

}
