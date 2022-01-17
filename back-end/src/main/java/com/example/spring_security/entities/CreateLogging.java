package com.example.spring_security.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public abstract class CreateLogging {
    @CreatedDate
    protected LocalDateTime createdAt;
    @CreatedBy
    protected String createdBy;

    public CreateLogging(CreateLogging createLogging) {
        this.setCreatedAt(createLogging.getCreatedAt());
        this.setCreatedBy(createLogging.getCreatedBy());
    }
}
