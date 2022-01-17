package com.example.spring_security.entities;

import lombok.Data;
import lombok.NoArgsConstructor;
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
public class ModifyLogging {
    @LastModifiedDate
    protected LocalDateTime modifiedAt;
    @LastModifiedBy
    protected String modifiedBy;

    public ModifyLogging(ModifyLogging modifyLogging) {
        this.setModifiedAt(modifyLogging.getModifiedAt());
        this.setModifiedBy(modifyLogging.getModifiedBy());
    }
}
