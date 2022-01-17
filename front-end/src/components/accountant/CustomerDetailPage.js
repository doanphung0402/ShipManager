import React from "react";
import { useLocation } from "react-router-dom";
import { vietnameseSlug } from "../../common/utils";
import CustomerOrdersTable from "./CustomerOrdersTable";
import LocalSearch from "../form/LocalSearch";
import CustomerPageHeader from "./CustomerPageHeader";

import { toast } from "react-toastify";
import { Card, Row, Form, Col, Tabs, DatePicker, Typography } from "antd";

import moment from "moment";
import CustomerDebtTable from "./CustomerDebtTable";
import DetailDebtTable from "./DetailDebtTable";
import HistoryTable from "./HistoryTable";
import RangePicker from "../form/RangePicker";
import { getDataCookies } from "../../functions/cookie";
import { getCustomerByCode } from "../../functions/customer";
import { getAllOrders } from "../../functions/order";

const CustomerDetailPage = () => {
  const [customer, setCustomer] = React.useState("");
  const [customerOrders, setCustomerOrders] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [keySelect, setKeySelect] = React.useState("");
  const keys = ["code", "pickupArea", "deliveryArea"];

  let { pathname } = useLocation();
  const code = pathname.split("/").pop();

  const user = getDataCookies("LOGGED_IN_USER");

  React.useEffect(() => {
    loadCustomer();
    loadCustomerOrders();
  }, [code]);

  const loadCustomer = () => {
    getCustomerByCode(code, user.token)
      .then((res) => {
        setCustomer(res.data);
      })
      .catch((err) => console.log(err));
  };

  const loadCustomerOrders = () => {
    getAllOrders()
      .then((res) => {
        setCustomerOrders(res.data.filter((item) => item.createdBy === code));
      })
      .catch((err) => console.log(err));
  };

  const searched = (keyword) => (item) => vietnameseSlug(item[keySelect]).includes(keyword);

  const onFinish = ({ keySelect, keySearch }) => {
    setKeySelect(keySelect);
    setKeyword(vietnameseSlug(keySearch));
  };

  function onChange(dates, dateStrings) {
    console.log("From: ", moment(dates[0]).format(), ", to: ", moment(dates[1]).format());
    console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
  }

  return (
    <Row style={{ margin: "0 12px" }} gutter={[24, 24]}>
      <Col span={24}>
        <Card>{customer && <CustomerPageHeader data={customer} />}</Card>
      </Col>
      <Col span={24}>
        <Card>
          <Tabs defaultActiveKey="ordersTable">
            <Tabs.TabPane tab="Danh sách đơn hàng" key="ordersTable">
              <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
                <RangePicker onChange={onChange} />
                <LocalSearch selectKeys={keys} onFinish={onFinish} />
              </Row>
              <CustomerOrdersTable data={customerOrders.filter(searched(keyword))} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Công nợ" key="debtTable">
              <Row justify="start" style={{ marginBottom: 24 }} gutter={16}>
                <Col className="gutter-row" span={8} style={{ marginLeft: 32 }}>
                  <Typography.Text style={{ marginRight: 30 }}> Chọn ngày: </Typography.Text>
                  <RangePicker onChange={onChange} />
                </Col>
              </Row>
              <DetailDebtTable />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử thanh toán" key="history">
              <HistoryTable />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};

export default CustomerDetailPage;
