package com.example.spring_security.security.models;

import com.example.spring_security.entities.users.Customer;
import com.example.spring_security.repositories.CustomerRepository;
import com.example.spring_security.security.models.CustomerDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("customerDetailsService")
public class CustomerDetailsService implements UserDetailsService {
    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Customer> c = customerRepository.findCustomerByPhoneNumber(username);
        Customer customer = c.orElseThrow(() -> new UsernameNotFoundException("phone not found !"));
        CustomerDetails customerDetails = new CustomerDetails(customer);
        return customerDetails;
    }
}
