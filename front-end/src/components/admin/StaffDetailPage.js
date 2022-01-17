import React from "react";

import { vietnameseSlug } from "../../common/utils";
import CustomerOrdersTable from "./CustomerOrdersTable";
import LocalSearch from "../delivery/LocalSearch";
import StaffPageHeader from "./StaffPageHeader";

import { toast } from "react-toastify";
import { Card, Row, Form, Col, Tabs } from "antd";

import { dataOrders, dataCustomers, dataStaffs } from "../../constant/initialValues";

const StaffDetailPage = () => {
  const [form] = Form.useForm();
  const [keyword, setKeyword] = React.useState("");
  const [keySelect, setKeySelect] = React.useState("");
  const keys = ["code", "pickupArea", "deliveryArea"];

  const handleRemove = (id) => {
    toast.error(id);
  };

  const searched = (keyword) => (item) => vietnameseSlug(item[keySelect]).includes(keyword);

  const onFinish = ({ keySelect, keySearch }) => {
    setKeySelect(keySelect);
    setKeyword(vietnameseSlug(keySearch));
  };

  return (
    <Row style={{ margin: "0 12px" }} gutter={[24, 24]}>
      <Col span={24}>
        <Card>
          <StaffPageHeader data={dataStaffs[2]} />
        </Card>
      </Col>
      <Col span={24}>
        <Card>
          <Tabs defaultActiveKey="ordersTable">
            <Tabs.TabPane tab="Danh sách đơn hàng" key="ordersTable">
              <Row justify="center" style={{ marginBottom: 24 }}>
                <LocalSearch selectKeys={keys} onFinish={onFinish} />
              </Row>
              <CustomerOrdersTable data={dataOrders.filter(searched(keyword))} handleRemove={handleRemove} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Công nợ" key="debtTable"></Tabs.TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};

export default StaffDetailPage;
