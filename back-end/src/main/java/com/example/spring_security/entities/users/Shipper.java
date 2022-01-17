package com.example.spring_security.entities.users;


import com.example.spring_security.entities.order.Order;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
public class Shipper extends Employee {

    @OneToMany(mappedBy = "assignment.shipper")
    private List<Order> orders = new ArrayList<>();

    public Shipper(Employee employee) {
        super(employee);
        this.setAuthority(EmployeeRole.ROLE_shipper);
    }
}
