package com.example.spring_security.repositories;

import com.example.spring_security.entities.users.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {

    @Query("select c from Customer c where c.body.phoneNumber = ?1")
    Optional<Customer> findCustomerByPhoneNumber(String phoneNumber);

    @Query("select (count(c) > 0) from Customer c where c.body.phoneNumber = ?1")
    boolean existsCustomerByPhoneNumber(String phoneNumber);

    Optional<Customer> findCustomerByCode(String code);
}
