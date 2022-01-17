package com.example.spring_security.repositories;

import com.example.spring_security.entities.order.Order;
import com.example.spring_security.entities.order.OrderStatusInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    Optional<Order> findOrderByCode(String code);

    @Query("select o from Order o where o.status = ?1 or o.status = ?2 or o.status =?3 or o.status =?4 or o.status =?5 or o.status=?6")
    List<Order> findOrdersByStatusOrStatus(OrderStatusInfo.OrderStatus status1,OrderStatusInfo.OrderStatus status2,
                                           OrderStatusInfo.OrderStatus status3,OrderStatusInfo.OrderStatus status4
     , OrderStatusInfo.OrderStatus status5 ,OrderStatusInfo.OrderStatus status6);
    @Query("select o from Order o ")
    List<Order> getAllOrderAllStatus();
    @Query("select o from Order o where o.status = ?1")
    List<Order> findOrdersByStatus(OrderStatusInfo.OrderStatus status);

//    @Query("select o from Order o ")
//    List<Order> getAllOrderAllStatus() ;
     @Query("select o from Order o where o.status = ?1 or o.status = ?2 or o.status =?3 or o.status =?4")
     List<Order> findAllOrderByStatusDelivery(OrderStatusInfo.OrderStatus status1,OrderStatusInfo.OrderStatus status2,
                                       OrderStatusInfo.OrderStatus status3,OrderStatusInfo.OrderStatus status4);

    @Query("select o from Order o where o.status = ?1 or o.status = ?2 or o.status =?3 or o.status =?4")
    List<Order> findAllOrderByStatusReturn(OrderStatusInfo.OrderStatus status1,OrderStatusInfo.OrderStatus status2,
                                             OrderStatusInfo.OrderStatus status3,OrderStatusInfo.OrderStatus status4);
}

