import React from "react";
import { Layout, Tabs, List, Row, Col, Avatar, Space, Typography, Tag, Button, Statistic } from "antd";
import ListOrderDetail from "./ListOrderDetail";
import { getDataCookies } from "../../functions/cookie";
import { getAllOrdersCustomerInfo } from "../../functions/customer";

const ListOrderPage = () => {
  const [myOrders, setMyOrders] = React.useState([]);

  const user = getDataCookies("LOGGED_IN_USER");

  React.useEffect(() => {
    loadAllCustomerOrders();
  }, []);

  const loadAllCustomerOrders = () =>
    getAllOrdersCustomerInfo(user.token)
      .then((res) => setMyOrders(res.data))
      .catch((err) => console.log(err));

  const renderOrdersList = () => (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        pageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "20", "30"],
      }}
      dataSource={myOrders}
      renderItem={(order) => (
        <List.Item key={order.code}>
          <ListOrderDetail order={order} />
        </List.Item>
      )}
    />
  );

  return (
    <Row justify="center" style={{ marginTop: 8, marginBottom: 24, minHeight: "100vh" }}>
      <Col span={16} style={{ backgroundColor: "#fff", padding: "0 24px" }}>
        <Tabs className="list-order-tabs" defaultActiveKey="1" style={{ marginBottom: 16, width: "100%" }}>
          <Tabs.TabPane tab="Tất cả" key="1">
            <div>{renderOrdersList()}</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Chờ lấy hàng" key="2">
            <div>Content of tab 1</div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Đang giao" key="3">
            Content of tab 2
          </Tabs.TabPane>
          <Tabs.TabPane tab="Giao thành công" key="4">
            Content of tab 3
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default ListOrderPage;
