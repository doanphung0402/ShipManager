package com.example.spring_security.entities.users;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Embeddable
@Data
@NoArgsConstructor
public class MoneyChangeLog {
    private long moneyChange;
    @NotBlank
    private String reason;
    private LocalDateTime createdAt;
    private String createdBy;

    public MoneyChangeLog(long moneyChange, String reason) {
        this.reason = reason;
        this.moneyChange = moneyChange;
        this.createdAt = LocalDateTime.now();
        this.createdBy = SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
