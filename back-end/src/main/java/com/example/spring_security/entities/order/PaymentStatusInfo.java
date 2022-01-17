package com.example.spring_security.entities.order;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Embeddable
@Data
@NoArgsConstructor
public class PaymentStatusInfo {
    public enum PaymentStatus {
        NOT_YET_COD_COLLECTED,
        COD_COLLECTED,
        COD_RETURNED,
    }
    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;
    private LocalDateTime createdAt;
    private String createdBy;

    public PaymentStatusInfo(PaymentStatus paymentStatus) {
        this.createdAt = LocalDateTime.now();
        this.createdBy = SecurityContextHolder.getContext().getAuthentication().getName();
        this.paymentStatus = paymentStatus;
    }
}
