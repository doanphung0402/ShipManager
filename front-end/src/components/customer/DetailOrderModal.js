import React, { useEffect, useState } from "react";
import { Statistic, Space, Steps, Row, Col, List, Avatar, Button, PageHeader, Descriptions, Modal, Tag, Typography } from "antd";
import { BsFillPrinterFill } from "react-icons/bs";
import { getDataCookies, setDataCookies } from "../../functions/cookie";
import OrderProductsTable from "./OrderProductsTable";

const DetailOrderModal = ({ visible, setVisible, order }) => {
  const [orderStatus, setOrderStatus] = useState([]);

  const user = getDataCookies("LOGGED_IN_USER");

  useEffect(() => {
    fetch(`http://localhost:8080/orders_with_status/${order.code}`, {
      method: "GET",
      headers: {
        Authorization: user.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrderStatus(data.orderStatusInfos);
        //console.log(data);
      });
  }, [order.code]);

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const renderContent = (column = 3) => (
    <Descriptions size="default" column={column}>
      <Descriptions.Item span={3} label="Người nhận">
        {order.body.receiver.fullName}
      </Descriptions.Item>
      <Descriptions.Item span={3} label="Địa chỉ nhận">
        {order.body.receiver.addressInfo.address}, {order.body.receiver.addressInfo.area}
      </Descriptions.Item>
      <Descriptions.Item span={3} label="Ghi chú">
        {order.body.note}
      </Descriptions.Item>
    </Descriptions>
  );

  const renderProductsList = (products) => (
    <List
      itemLayout="vertical"
      dataSource={products}
      split={false}
      pagination={false}
      renderItem={(product) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar shape="square" size={64} gap={4}>
                {product}
              </Avatar>
            }
            title={<Typography.Text ellipsis>{product}</Typography.Text>}
            description={<Typography.Text ellipsis>{product}</Typography.Text>}
          />
        </List.Item>
      )}
    />
  );
  const extraContent = (
    <Space align="end" direction="vertical" size={16} style={{ marginLeft: "auto" }}>
      <Space size={16}>
        <Statistic title="COD" valueStyle={{ fontSize: 18 }} value={order.body.codMoney} />
        <Statistic title="Phí Ship" valueStyle={{ fontSize: 18 }} value={order.shipMoney} />
      </Space>
      <Statistic title="Tổng tiền" suffix="₫" value={order.shipMoney + order.body.codMoney} />
    </Space>
  );

  const Content = ({ children, extra }) => (
    <Row>
      <Col span={16}>{children}</Col>
      <Col span={8} style={{ display: "flex" }}>
        {extra}
      </Col>
    </Row>
  );
  const StepTitle = (day, time, stt) => {
    return (
      <Space>
        <Typography.Text style={{ marginRight: 10 }}>{day}</Typography.Text>
        <Typography.Text style={{ marginRight: 10 }}>{time}</Typography.Text>
        <Tag color={"processing"}>{stt}</Tag>
      </Space>
    );
  };
  return (
    <Modal
      title={
        <Typography.Text>
          Chi tiết đơn hàng <b>{order.code}</b>
        </Typography.Text>
      }
      visible={visible}
      width={1140}
      footer={null}
      onCancel={() => setVisible(false)}
      style={{ top: 40 }}
    >
      <PageHeader
        style={{ padding: 0, marginBottom: 24 }}
        onBack={() => setVisible(false)}
        title={order.code}
        footer={() => ""}
        tags={<Tag color={"processing"}>{order.status}</Tag>}
        extra={[
          <Space key="controls">
            <Button type="text" size="large">
              Cập nhật
            </Button>
            <Button size="large" type="primary" style={{ gap: 4 }} icon={<BsFillPrinterFill />}>
              PDF
            </Button>
          </Space>,
        ]}
      >
        <Content extra={extraContent}>{renderContent()}</Content>
      </PageHeader>
      <Row justify="space-between" gutter={[24, 24]}>
        <Col span={12}>
          <OrderProductsTable data={order.body.productsList.map((p) => ({ name: p, desc: p }))} />
        </Col>
        <Col span={12}>
          <Steps progressDot current={0} direction="vertical">
            {orderStatus.map((stt) => (
              <Steps.Step
                title={StepTitle(new Date(stt.createdAt).toLocaleDateString(), new Date(stt.createdAt).toLocaleTimeString(), stt.orderStatus)}
                size={"small"}
              />
            ))}
            {/* <Step title="Waiting"/>  */}
          </Steps>
        </Col>
      </Row>
    </Modal>
  );
};

export default DetailOrderModal;
