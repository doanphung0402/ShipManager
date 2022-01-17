package com.example.spring_security.entities.users.dto;

import com.example.spring_security.entities.users.Customer;
import com.example.spring_security.entities.users.GeneralUser;
import com.example.spring_security.entities.users.MoneyChangeLog;
import com.example.spring_security.entities.users.ReturnCodLog;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class CustomerDTO extends GeneralUser {
    private String code;
    private long currentMoney;
    private CustomerDTOForEdit body;
    private String phoneNumber;
    private List<ReturnCodLog> returnCodLog;

    public CustomerDTO(Customer customer) {
        super(customer);
        this.code = customer.getCode();
        this.currentMoney = customer.getCurrentMoney();
        this.body = customer.getBody().getBody();
        this.phoneNumber = customer.getBody().getPhoneNumber();
        this.returnCodLog = customer.getReturnCodLog();
    }
}
