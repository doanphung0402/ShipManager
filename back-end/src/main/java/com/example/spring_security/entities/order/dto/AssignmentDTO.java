package com.example.spring_security.entities.order.dto;

import com.example.spring_security.entities.order.Assignment;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssignmentDTO {
    private String shipper_code;
    private LocalDateTime assignedAt;
    private String assignedBy;
    private Assignment.AssignmentType assignmentType;

    public AssignmentDTO(Assignment assignment) {
        this.shipper_code = assignment.getShipper().getCode();
        this.assignedAt = assignment.getAssignedAt();
        this.assignedBy = assignment.getAssignedBy();
        this.assignmentType = assignment.getAssignmentType();
    }
}
