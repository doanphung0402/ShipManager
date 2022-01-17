package com.example.spring_security.entities.users;

import com.example.spring_security.entities.ModifyLogging;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@MappedSuperclass
@Data
@NoArgsConstructor
public abstract class GeneralUser {
    public enum AccountStatus {NORMAL, LOCKED, EXPIRED}

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    protected AccountStatus accountStatus = AccountStatus.NORMAL;

    public GeneralUser(GeneralUser generalUser) {
        this.setAccountStatus(generalUser.getAccountStatus());
    }
}
