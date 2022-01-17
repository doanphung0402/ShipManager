package com.example.spring_security.services;

import com.example.spring_security.entities.order.Order;
import com.example.spring_security.entities.order.dto.OrderDTO;
import com.example.spring_security.entities.order.dto.OrderDTOForCreate;
import com.example.spring_security.entities.users.Customer;
import com.example.spring_security.entities.users.GeneralUser;
import com.example.spring_security.entities.users.dto.CustomerDTOForCreate;
import com.example.spring_security.entities.users.dto.CustomerDTOForEdit;
import com.example.spring_security.error.AlreadyExistException;
import com.example.spring_security.error.NotFoundException;
import com.example.spring_security.repositories.CustomerRepository;
import com.example.spring_security.utils.CustomerCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CustomerCodeGenerator customerCodeGenerator;

    @Transactional
    public Customer createCustomer(CustomerDTOForCreate customerDTO) {
        checkPhoneNumber(customerDTO.getPhoneNumber());
        Customer customer = new Customer(customerDTO, customerCodeGenerator.getCode(customerRepository.count()), passwordEncoder);
        return customerRepository.save(customer);
    }

    public List<Customer> allCustomers() {
        return customerRepository.findAll();
    }


    public Customer findCustomer(String code) {
        return customerRepository.findCustomerByCode(code).orElseThrow(() -> new NotFoundException("customer with this code not exist"));
    }

    public void checkPhoneNumber(String phoneNumber) {
        if (customerRepository.existsCustomerByPhoneNumber(phoneNumber)) {
            throw new AlreadyExistException("phone number already existed");
        }
    }

    @Transactional
    public Customer changeAccountStatus(String code, GeneralUser.AccountStatus accountStatus) {
        Customer customer = findCustomer(code);
        customer.setAccountStatus(accountStatus);
        return customer;
    }

    @Transactional
    public Customer updateCustomer(String code, CustomerDTOForEdit customerDTO) {
        Customer customer = findCustomer(code);
        customer.update(customerDTO);
        return customer;
    }

    public List<Order> findCustomerOrders(String code) {
        Customer customer = findCustomer(code);
        return customer.getOrders();
    }

    @Transactional
    public Customer deposit(String code, long money) {
        Customer customer = findCustomer(code);
        customer.deposit(money);
        return customer;
    }

    @Transactional
    public Customer withdraw(String code, long money) {
        Customer customer = findCustomer(code);
        customer.withdraw(money);
        return customer;
    }
}
