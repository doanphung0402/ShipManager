package com.example.spring_security.entities.users;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.Embeddable;
import java.time.LocalDateTime;

@Embeddable
@Data
@NoArgsConstructor
public class ReturnCodLog {
    private long returnCod;
    private LocalDateTime createdAt;
    private String createdBy;

    public ReturnCodLog(long returnCod) {
        this.returnCod = returnCod;
        this.createdAt = LocalDateTime.now();
        this.createdBy = SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
