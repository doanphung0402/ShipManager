package com.example.spring_security.repositories;

import com.example.spring_security.entities.users.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    @Query("select e from Employee e where e.body.username = ?1")
    Optional<Employee> findEmployeeByUsername(String username);

    @Query("select (count(e) > 0) from Employee e where e.body.username = ?1")
    boolean existsEmployeeByUsername(String username);

    Optional<Employee> findEmployeeByCode(String code);
}
