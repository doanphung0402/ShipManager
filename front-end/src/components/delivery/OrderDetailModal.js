import React, { useEffect, useState } from "react";
import { Modal, Tag, PageHeader, Space, Button, Statistic, Descriptions, Divider, Typography } from "antd";
import * as ServiceOrder from "../../functions/order"; 
const OrderDetailModal = ({ order, visible, setVisible }) => {
  const code  =  order.code ; 
   
  let [newOrder,setNewOrder] =useState({});
  const orderSizes = ["30x20x30", "50x40x50", "90x60x90"];
  useEffect(()=>{
      ServiceOrder.getOrderByCode(code).then((data)=>{
        const order = data.data ; 
        console.log("🚀 ~ file: OrderDetailModal.js ~ line 13 ~ ServiceOrder.getOrderByCode ~ order", order)
        const DetailOrder = {
          employee : order.createdBy,
          code: order.code , 
          sender: order.sender.fullName ,
          received : order.body.receiver.fullName,
          pickupArea: order.sender.addressInfo.area, 
          pickupAreaDetail:order.sender.addressInfo.address, 
          pickupBy: order.assignment ===null?"":order.assignment.shipper_code , 
          pickupAt:  order.assignment ===null?"":order.assignment.assignedAt,
          pickupStatus: order.status , 
      
          deliveryArea:order.body.receiver.addressInfo.area , 
          deliveryAreaDetail: order.body.receiver.addressInfo.address , 
          deliveryBy:order.assignment ===null?"":order.assignment.shipper_code , 
          deliveryAt: null ,
          deliveryStatus:  order.status , 
      
          status:  order.status , 
          debtStatus:order.paymentStatusInfo.paymentStatus ,
      
          orderName: order.body.productsList, 
          orderNote: order.body.note, 
          orderWeight: order.body.weight, 
          orderSize: orderSizes[1], 
          orderCOD: order.body.codMoney, 
          orderShipCost: order.shipMoney, 
          returnMoney: null, 
          orderDiscount: 1, 
          needToPay:null, 
          orderTotal:null, 
      
          updatedAt: order.paymentStatusInfo.createdAt, 
          createdAt: order.createdAt 
        }
        console.log("🚀 ~ file: OrderDetailModal.js ~ line 46 ~ ServiceOrder.getOrderByCode ~ DetailOrder", DetailOrder)
        setNewOrder(DetailOrder)
      })
  },[]) 
  const setTagColor = (pickupStatus = "", deliveryStatus = "") => {
    if (pickupStatus === "READY_FOR_PICKUP"||deliveryStatus ==="RECEIVED_AT_OFFICE_WAIT_FOR_DELIVER") return "warning";
    if (pickupStatus === "PICKUP_FAIL" || deliveryStatus === "DELIVER_FAIL") return "error";
    if (pickupStatus === "PICKING" || deliveryStatus === "DELIVERING") return "processing";
    if (pickupStatus === "PICKUP_SUCCESS" || deliveryStatus === "DELIVER_SUCCESS") return "success";
  };
  const renderContent = (column = 2) => (
    <Descriptions size="small" column={column}>
      <Descriptions.Item span={2} label="Nhân viên phụ trách">
        <Typography.Link>{newOrder.employee}</Typography.Link>
      </Descriptions.Item>
      <Descriptions.Item label="Ngày tạo">{newOrder.createdAt}</Descriptions.Item>
      <Descriptions.Item label="Ngày cập nhật">{newOrder.updatedAt}</Descriptions.Item>
      <Descriptions.Item span={2}>
        <Divider></Divider>
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Tên sản phẩm">
        {newOrder.orderName}
      </Descriptions.Item>
      <Descriptions.Item label="Người gửi">
        <Typography.Link>{newOrder.sender}</Typography.Link>
      </Descriptions.Item>
      <Descriptions.Item label="Người nhận">
        <Typography.Text>{newOrder.received}</Typography.Text>
      </Descriptions.Item>
      <Descriptions.Item label="Trọng lượng đơn hàng">{newOrder.orderWeight}</Descriptions.Item>
      <Descriptions.Item label="Kích thước đơn hàng">{newOrder.orderSize}</Descriptions.Item>
      <Descriptions.Item span={2} label="Địa chỉ lấy hàng">
        {newOrder.pickupAreaDetail}, {newOrder.pickupArea}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Địa chỉ giao hàng">
        {newOrder.deliveryAreaDetail}, {newOrder.deliveryArea}
      </Descriptions.Item>
      <Descriptions.Item span={2} label="Ghi chú đơn hàng">
        {newOrder.orderNote}
      </Descriptions.Item>
      <Descriptions.Item span={2}>
        <Divider></Divider>
      </Descriptions.Item>
      <Descriptions.Item label="Nhân viên lấy hàng">
        <Typography.Link>{newOrder.pickupBy}</Typography.Link>
      </Descriptions.Item>
      <Descriptions.Item label="Trạng thái lấy hàng">
        <Tag color={setTagColor(newOrder.pickupStatus)}>{newOrder.pickupStatus}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Nhân viên giao hàng">
        <Typography.Link>{newOrder.deliveryBy}</Typography.Link>
      </Descriptions.Item>
      <Descriptions.Item label="Trạng thái giao hàng">
        {setTagColor(newOrder.pickupStatus) !== "success" ? "-----" : <Tag color={setTagColor("", newOrder.deliveryStatus)}>{newOrder.deliveryStatus}</Tag>}
      </Descriptions.Item>
    </Descriptions>
  );
  const extraContent = (
    <Space size={48} direction="vertical" style={{ width: 120 }}>
      <Statistic title="COD" value={newOrder.orderCOD} />
      <Statistic title="Phí vận chuyển" value={newOrder.orderShipCost} />
      <Statistic title="Chiết khấu" suffix="%" value={newOrder.orderDiscount} />
      <Statistic title="Tổng (VNĐ)" value={newOrder.orderTotal} />
    </Space>
  );

  const Content = ({ children, extra }) => (
    <Space size={24} align="start">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </Space>
  );

  return (
    <Modal
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      width={1000}
      title={
        <p style={{ margin: 0 }}>
          Chi tiết đơn <b>{order.code}</b>
        </p>
      }
    >
      <PageHeader
        style={{ padding: 0 }}
        onBack={() => setVisible(false)}
        title={order.code}
        footer={() => ""}
        tags={<Tag color={setTagColor(order.pickupStatus, order.deliveryStatus)}>{order.status}</Tag>}
        extra={[
          <Button key="update">Update</Button>,
          <Button key="mail">Mail</Button>,
          <Button key="print" type="primary">
            Print
          </Button>,
        ]}
      >
        <Content extra={extraContent}>{renderContent()}</Content>
      </PageHeader>
    </Modal>
  );
};

export default OrderDetailModal;
