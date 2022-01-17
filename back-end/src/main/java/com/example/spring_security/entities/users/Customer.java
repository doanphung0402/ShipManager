package com.example.spring_security.entities.users;

import com.example.spring_security.entities.order.Order;
import com.example.spring_security.entities.users.dto.CustomerDTOForCreate;
import com.example.spring_security.entities.users.dto.CustomerDTOForEdit;
import com.example.spring_security.error.NotEnoughException;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Customer extends GeneralUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(nullable = false, unique = true)
    private String code;

    @NotNull
    @Column(nullable = false)
    private String encodedPassword;

    @NotNull
    @Valid
    private CustomerDTOForCreate body;

    private long currentMoney;

    @ElementCollection
    @CollectionTable(name = "customer_money_change")
    @Valid
    private List<MoneyChangeLog> moneyChangeLogs = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "customer_return_cod")
    @Valid
    private List<ReturnCodLog> returnCodLog = new ArrayList();

    @OneToMany(mappedBy = "customer")
    private List<Order> orders = new ArrayList<>();

    public Customer(CustomerDTOForCreate body, String code, PasswordEncoder passwordEncoder) {
        this.body = body;
        this.code = code;
        this.encodedPassword = passwordEncoder.encode(body.getPassword());
    }

    public void update(CustomerDTOForEdit body) {
        this.body.setBody(body);
    }

    public void addMoney(long money, String reason) {
        if (this.currentMoney + money < 0) {
            throw new NotEnoughException("not enough money, current money: " + this.currentMoney);
        }
        MoneyChangeLog moneyChangeLog = new MoneyChangeLog(money, reason);
        this.moneyChangeLogs.add(moneyChangeLog);
        this.currentMoney += money;
    }

    public void deposit(long money) {
        addMoney(money, "Deposit");
    }

    public void withdraw(long money) {
        addMoney(-money,"Withdraw");
    }

    public void payShipMoney(long money, String orderCode) {
        addMoney(-money,"Pay ship money for order " + orderCode);
    }

    public void payReturnMoney(long money, String orderCode) {
        addMoney(-money,"Pay return money for order " + orderCode);
    }

    public void receiveCodMoney(long money,List<String> orderCodes) {
        addMoney(money, "Receive cod money for orders: " + orderCodes.toString());
        this.returnCodLog.add(new ReturnCodLog(money));
    }

    @PreUpdate
    public void preUpdate() {
        this.body.setPassword("*****");
    }
}
