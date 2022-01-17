package com.example.spring_security.entities.order;

import com.example.spring_security.entities.users.Shipper;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Embeddable
@Data
@NoArgsConstructor
public class Assignment {
    public enum AssignmentType {PICKUP, DELIVER, RETURN}
    @ManyToOne
    private Shipper shipper;
    private LocalDateTime assignedAt;
    private String assignedBy;
    @Enumerated(EnumType.STRING)
    private AssignmentType assignmentType;

    public Assignment(Shipper shipper, AssignmentType assignmentType) {
        this.shipper = shipper;
        this.assignedAt = LocalDateTime.now();
        this.assignedBy = SecurityContextHolder.getContext().getAuthentication().getName();
        this.assignmentType = assignmentType;
    }
}
