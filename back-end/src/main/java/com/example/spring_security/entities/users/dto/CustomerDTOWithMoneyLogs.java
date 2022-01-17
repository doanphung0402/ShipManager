package com.example.spring_security.entities.users.dto;

import com.example.spring_security.entities.users.Customer;
import com.example.spring_security.entities.users.MoneyChangeLog;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CustomerDTOWithMoneyLogs extends CustomerDTO{
    private List<MoneyChangeLog> moneyChangeLogs;

    public CustomerDTOWithMoneyLogs(Customer customer) {
        super(customer);
        this.moneyChangeLogs = customer.getMoneyChangeLogs();
    }
}
