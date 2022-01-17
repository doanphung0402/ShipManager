package com.example.spring_security.services;

import com.example.spring_security.entities.order.Order;
import com.example.spring_security.entities.order.dto.OrderDTO;
import com.example.spring_security.entities.users.Employee;
import com.example.spring_security.entities.users.Shipper;
import com.example.spring_security.entities.users.dto.EmployeeDTOForCreate;
import com.example.spring_security.error.NotFoundException;
import com.example.spring_security.repositories.ShipperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShipperService {
    @Autowired
    private ShipperRepository shipperRepository;
    @Autowired
    private EmployeeService employeeService;

    @Transactional
    public Shipper createShipper(EmployeeDTOForCreate employeeDTO) {
        Employee employee = employeeService.makeEmployee(employeeDTO, Employee.EmployeeRole.ROLE_shipper);
        Shipper shipper = new Shipper(employee);
        return shipperRepository.save(shipper);
    }

    public List<Shipper> allShippers() {
        return shipperRepository.findAll();
    }

    public Shipper findShipper(String code) {
        return shipperRepository.findShipperByCode(code).orElseThrow(() -> new NotFoundException("shipper with this code not exist"));
    }

    public List<Order> findShipperPickups(String code) {
        Shipper shipper = findShipper(code);
        return shipper.getOrders().stream().filter(Order::isPickupAssigned).collect(Collectors.toList());
    }

    public List<Order> findShipperDelivers(String code) {
        Shipper shipper = findShipper(code);
        return shipper.getOrders().stream().filter(Order::isDeliverAssigned).collect(Collectors.toList());
    }

    public List<Order> findShipperReturns(String code) {
        Shipper shipper = findShipper(code);
        return shipper.getOrders().stream().filter(Order::isReturnAssigned).collect(Collectors.toList());
    }

    public List<Order> findOrdersShipperMustTakeToOffice(String code) {
        Shipper shipper = findShipper(code);
        return shipper.getOrders().stream().filter(Order::isMustTakeToOffice).collect(Collectors.toList());
    }

    public List<Order> findOrdersShipperGiveCodToAccountant(String code) {
        Shipper shipper = findShipper(code);
        return shipper.getOrders().stream().filter(Order::isMustGiveCodToAccountant).collect(Collectors.toList());
    }
}
