package com.example.spring_security.utils;

import com.example.spring_security.entities.order.OrderStatusInfo;

import java.util.Map;

public class StatusTransitionChecker {
    public static boolean isFineStatusTransition(OrderStatusInfo.OrderStatus prev, OrderStatusInfo.OrderStatus next) {
        switch (next) {
            case PICKING:
                switch (prev) {
                    case READY_FOR_PICKUP:
                    case PICKUP_FAIL_WAIT_FOR_PICKUP:
                        return true;
                }
                break;

            case PICKUP_FAIL:
            case PICKUP_SUCCESS:
                switch (prev) {
                    case PICKING:
                        return true;
                }
                break;

            case RECEIVED_AT_OFFICE:
                switch (prev) {
                    case PICKUP_SUCCESS:
                    case DELIVER_FAIL:
                    case RETURN_FAIL:
                        return true;
                }
                break;

            case DELIVERING:
                switch (prev) {
                    case RECEIVED_AT_OFFICE_WAIT_FOR_DELIVER:
                        return true;
                }
                break;

            case DELIVER_FAIL:
            case DELIVER_SUCCESS:
                switch (prev) {
                    case DELIVERING:
                        return true;
                }
                break;

            case QUERY_FOR_RETURNING:
                switch (prev) {
                    case RECEIVED_AT_OFFICE_WAIT_FOR_RETURN:
                        return true;
                }
                break;

            case RETURNING:
                switch (prev) {
                    case QUERY_FOR_RETURNING:
                        return true;
                }
                break;

            case RETURN_SUCCESS:
            case RETURN_FAIL:
                switch (prev) {
                    case RETURNING:
                        return true;
                }
                break;
        }
        return false;
    }
}
