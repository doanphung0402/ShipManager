package com.example.spring_security.services;

import com.example.spring_security.entities.order.OrderStatusInfo;
import com.example.spring_security.entities.order.Order;
import com.example.spring_security.entities.order.dto.OrderDTO;
import com.example.spring_security.entities.order.dto.OrderDTOForCreate;
import com.example.spring_security.entities.users.Customer;
import com.example.spring_security.entities.users.Shipper;
import com.example.spring_security.error.NotAllowException;
import com.example.spring_security.error.NotFoundException;
import com.example.spring_security.repositories.OrderRepository;
import com.example.spring_security.utils.OrderCodeGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private OrderCodeGenerator orderCodeGenerator;
    @Autowired
    private ShipperService shipperService;

    @Transactional
    public Order createOrder(OrderDTOForCreate orderDTO, String code) {
        Customer customer = customerService.findCustomer(code);
        Order order = new Order(customer, orderDTO, orderCodeGenerator.getCode(orderRepository.count()));
        customer.payShipMoney(order.getShipMoney(), order.getCode());
        return orderRepository.save(order);
    }

    public List<Order> allOrders() {
        return orderRepository.findAll();
    }

    public Order findOrder(String code) {
        return orderRepository.findOrderByCode(code).orElseThrow(() -> new NotFoundException("order with this code not exist"));
    }

    @Transactional
    public Order shipperUpdateStatus(String code, OrderStatusInfo orderStatusInfo) {
        switch (orderStatusInfo.getOrderStatus()) {
            case PICKUP_FAIL:
            case PICKUP_SUCCESS:
            case DELIVER_FAIL:
            case DELIVER_SUCCESS:
            case RETURN_FAIL:
            case RETURN_SUCCESS:
                Order order = findOrder(code);
                order.updateStatus(orderStatusInfo);
                return order;
        }
        throw new NotAllowException("shipper can not update status " + orderStatusInfo.getOrderStatus());
    }

    @Transactional
    public void assignPickup(String shipper_code, List<String> order_codes) {
        Shipper shipper = shipperService.findShipper(shipper_code);
        for (String order_code: order_codes) {
            findOrder(order_code).assignPickup(shipper);
        }
    }

    @Transactional
    public void assignDeliver(String shipper_code, List<String> order_codes) {
        Shipper shipper = shipperService.findShipper(shipper_code);
        for (String order_code: order_codes) {
            findOrder(order_code).assignDeliver(shipper);
        }
    }

    @Transactional
    public void assignReturn(String shipper_code, List<String> order_codes) {
        Shipper shipper = shipperService.findShipper(shipper_code);
        for (String order_code: order_codes) {
            findOrder(order_code).assignReturn(shipper);
        }
    }

    public List<Order> allCandidatesForPickup() {
        return orderRepository.findOrdersByStatusOrStatus(OrderStatusInfo.OrderStatus.READY_FOR_PICKUP, OrderStatusInfo.OrderStatus.PICKUP_FAIL_WAIT_FOR_PICKUP,
                OrderStatusInfo.OrderStatus.PICKUP_SUCCESS,OrderStatusInfo.OrderStatus.PICKUP_FAIL,OrderStatusInfo.OrderStatus.PICKING,OrderStatusInfo.OrderStatus.PICKUP);
    }

    public List<Order> allCandidatesForDeliver() {
        return orderRepository.findAllOrderByStatusDelivery(OrderStatusInfo.OrderStatus.DELIVER_FAIL,OrderStatusInfo.OrderStatus.DELIVER_SUCCESS,
                OrderStatusInfo.OrderStatus.DELIVER_SUCCESS,OrderStatusInfo.OrderStatus.PICKUP_FAIL_WAIT_FOR_PICKUP);
    }

    public List<Order> allCandidatesForReturn() {
        return orderRepository.findAllOrderByStatusReturn(OrderStatusInfo.OrderStatus.QUERY_FOR_RETURNING,OrderStatusInfo.OrderStatus.RETURN_FAIL,
                OrderStatusInfo.OrderStatus.RETURNING,OrderStatusInfo.OrderStatus.RETURN_SUCCESS);
    }

    @Transactional
    public List<Order> receiveOrdersAtOffice(List<String> order_codes) {
        List<Order> orders = new ArrayList<>();
        order_codes.stream().forEach(order_code -> {
            Order order = findOrder(order_code);
            order.updateStatus(OrderStatusInfo.OrderStatus.RECEIVED_AT_OFFICE);
            orders.add(order);
        });
        return orders;
    }

    @Transactional
    public List<Order> collectCOD(List<String> order_codes) {
        List<Order> orders = new ArrayList<>();
        for (String order_code: order_codes) {
            Order order = findOrder(order_code);
            order.collectCOD();
            orders.add(order);
        };
        return orders;
    }

    @Transactional
    public List<Order> returnCOD(List<String> order_codes, String customer_code) {
        Customer customer = customerService.findCustomer(customer_code);
        List<Order> orders = new ArrayList<>();
        long money = 0;
        for (String order_code: order_codes) {
            Order order = findOrder(order_code);
            money += order.returnCOD();
            orders.add(order);
        };
        customer.receiveCodMoney(money, order_codes);
        return orders;
    }
}
