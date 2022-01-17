package com.example.spring_security.repositories;

import com.example.spring_security.entities.users.Shipper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShipperRepository extends JpaRepository<Shipper,Long> {
    Optional<Shipper> findShipperByCode(String code);
}
