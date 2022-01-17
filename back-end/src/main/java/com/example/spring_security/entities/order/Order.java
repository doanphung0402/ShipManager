package com.example.spring_security.entities.order;

import com.example.spring_security.entities.CreateLogging;
import com.example.spring_security.entities.order.dto.OrderDTOForCreate;
import com.example.spring_security.entities.users.Customer;
import com.example.spring_security.entities.users.Shipper;
import com.example.spring_security.error.AlreadyExistException;
import com.example.spring_security.error.NotAllowException;
import com.example.spring_security.error.NotEnoughException;
import com.example.spring_security.error.NotFoundException;
import com.example.spring_security.utils.ShipMoneyCalculator;
import com.example.spring_security.utils.StatusTransitionChecker;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "orders")
public class Order extends CreateLogging {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @ManyToOne
    @NotNull
    private Customer customer;

    @PositiveOrZero
    private int pickupNumberOfTimes;

    @PositiveOrZero
    private int deliverNumberOfTimes;

    @Positive(message = "must have positive ship money")
    private int shipMoney;

    @NotNull
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatusInfo.OrderStatus status;

    @ElementCollection
    @CollectionTable(name = "orders_status")
    @Valid
    private List<OrderStatusInfo> orderStatusInfos = new ArrayList<>();

    @Valid
    @NotNull
    private OrderDTOForCreate body;

    private Assignment assignment;

    @AttributeOverride(name = "createdAt", column = @Column(name = "payment_status_created_at"))
    @AttributeOverride(name = "createdBy", column = @Column(name = "payment_status_created_by"))
    private PaymentStatusInfo paymentStatusInfo;

    public Order(Customer customer, OrderDTOForCreate body, String code) {
        this.customer = customer;
        customer.getOrders().add(this);
        this.body = body;
        this.body.setProductsDescription(String.join(",",this.body.getProductsList()));
        this.code = code;
        this.status = OrderStatusInfo.OrderStatus.READY_FOR_PICKUP;
        this.orderStatusInfos.add(new OrderStatusInfo(OrderStatusInfo.OrderStatus.READY_FOR_PICKUP));
        this.paymentStatusInfo = new PaymentStatusInfo(PaymentStatusInfo.PaymentStatus.NOT_YET_COD_COLLECTED);
        this.shipMoney = (new ShipMoneyCalculator(this.customer.getBody().getBody().getAddressInfo().getArea(), this.body.getReceiver().getAddressInfo().getArea(), this.body.getWeight())).getShipMoney();
    }

    public void updateStatus(OrderStatusInfo orderStatusInfo) {
        OrderStatusInfo updatedStatus = orderStatusInfo;
        checkStatusTransition(updatedStatus.getOrderStatus());

        if (updatedStatus.getOrderStatus() == OrderStatusInfo.OrderStatus.PICKUP_FAIL) {
            if (isPickupTimesExceeded()) {
                updatedStatus = new OrderStatusInfo(OrderStatusInfo.OrderStatus.PICKUP_FAIL_CANCELLED);
            } else {
                updatedStatus = new OrderStatusInfo(OrderStatusInfo.OrderStatus.PICKUP_FAIL_WAIT_FOR_PICKUP);
            }
        } else if (updatedStatus.getOrderStatus() == OrderStatusInfo.OrderStatus.RECEIVED_AT_OFFICE) {
            if (isDeliverTimesExceeded()) {
                updatedStatus = new OrderStatusInfo(OrderStatusInfo.OrderStatus.RECEIVED_AT_OFFICE_WAIT_FOR_RETURN);
            } else {
                updatedStatus = new OrderStatusInfo(OrderStatusInfo.OrderStatus.RECEIVED_AT_OFFICE_WAIT_FOR_DELIVER);
            }
        }
        this.status = updatedStatus.getOrderStatus();
        this.orderStatusInfos.add(updatedStatus);
    }

    public void updateStatus(OrderStatusInfo.OrderStatus orderStatus) {
        updateStatus(new OrderStatusInfo(orderStatus));
    }

    public void collectCOD() {
        if (!isMustGiveCodToAccountant()) {
            throw new NotAllowException("Can't collect COD for order " + this.code + ", payment: " + this.paymentStatusInfo.getPaymentStatus() + ", status: " + this.status);
        }
        this.paymentStatusInfo = new PaymentStatusInfo(PaymentStatusInfo.PaymentStatus.COD_COLLECTED);
    }

    public long returnCOD() {
        if (!isMustReturnCod()) {
            throw new NotAllowException("Can't return COD for order " + this.code + ", payment: " + this.paymentStatusInfo.getPaymentStatus() + ", status: " + this.status);
        }
        this.paymentStatusInfo = new PaymentStatusInfo(PaymentStatusInfo.PaymentStatus.COD_RETURNED);
        return this.getBody().getCodMoney();
    }

    public void assignPickup(Shipper shipper) {
        unAssign();
        this.pickupNumberOfTimes += 1;
        this.assignment = new Assignment(shipper, Assignment.AssignmentType.PICKUP);
        shipper.getOrders().add(this);
        updateStatus(OrderStatusInfo.OrderStatus.PICKING);
    }

    public void assignDeliver(Shipper shipper) {
        unAssign();
        this.deliverNumberOfTimes += 1;
        this.assignment = new Assignment(shipper, Assignment.AssignmentType.DELIVER);
        shipper.getOrders().add(this);
        updateStatus(OrderStatusInfo.OrderStatus.DELIVERING);
    }

    public void assignReturn(Shipper shipper) {
        unAssign();
        this.assignment = new Assignment(shipper, Assignment.AssignmentType.RETURN);
        shipper.getOrders().add(this);
        updateStatus(OrderStatusInfo.OrderStatus.RETURNING);
    }

    public boolean isPickupTimesExceeded() {
        return pickupNumberOfTimes >= 2;
    }

    public boolean isDeliverTimesExceeded() {
        return deliverNumberOfTimes >= 2;
    }

    public void checkStatusTransition(OrderStatusInfo.OrderStatus next) {
        switch (next) {
            case PICKUP_FAIL_WAIT_FOR_PICKUP:
            case PICKUP_FAIL_CANCELLED:
            case RECEIVED_AT_OFFICE_WAIT_FOR_RETURN:
            case RECEIVED_AT_OFFICE_WAIT_FOR_DELIVER:
                throw new NotAllowException("status " + next + " is not allowed to update");
            default:
                if (!StatusTransitionChecker.isFineStatusTransition(this.status, next)) {
                    throw new NotAllowException("order is currently at status " + this.status + ", status " + next + " is not allowed to update");
                }
        }
    }

    public boolean isPickupAssigned() {
        if ((this.assignment != null)
                && (this.assignment.getAssignmentType() == Assignment.AssignmentType.PICKUP)
                && (this.status == OrderStatusInfo.OrderStatus.PICKING)) {
            return true;
        }
        return false;
    }

    public boolean isDeliverAssigned() {
        if ((this.assignment != null)
                && (this.assignment.getAssignmentType() == Assignment.AssignmentType.DELIVER)
                && (this.status == OrderStatusInfo.OrderStatus.DELIVERING)) {
            return true;
        }
        return false;
    }

    public boolean isReturnAssigned() {
        if ((this.assignment != null)
                && (this.assignment.getAssignmentType() == Assignment.AssignmentType.RETURN)
                && (this.status == OrderStatusInfo.OrderStatus.RETURNING)) {
            return true;
        }
        return false;
    }

    public void unAssign() {
        if (this.assignment != null) {
            this.assignment.getShipper().getOrders().remove(this);
            this.assignment = null;
        }
    }

    public boolean isMustTakeToOffice() {
        switch (this.status) {
            case PICKUP_SUCCESS:
            case DELIVER_FAIL:
            case RETURN_FAIL:
                return true;
        }
        return false;
    }

    public boolean isMustGiveCodToAccountant() {
        if (this.getBody().getCodMoney() == 0) {
            return false;
        }
        if ((this.status == OrderStatusInfo.OrderStatus.DELIVER_SUCCESS)
                && (this.paymentStatusInfo.getPaymentStatus() == PaymentStatusInfo.PaymentStatus.NOT_YET_COD_COLLECTED)) {
            return true;
        }
        return false;
    }

    public boolean isMustReturnCod() {
        if (this.getBody().getCodMoney() == 0) {
            return false;
        }
        if (this.paymentStatusInfo.getPaymentStatus() == PaymentStatusInfo.PaymentStatus.COD_COLLECTED) {
            return true;
        }
        return false;
    }
    @PreUpdate
    public void preUpdate() {
        this.body.setProductsList(List.of(""));
    }
}
