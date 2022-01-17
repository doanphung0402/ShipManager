import React from "react";

import { toast } from "react-toastify";
import { Button, Form, Row, Col, Card, Typography, Space, Divider, Input, Select, Radio, Tabs } from "antd";

import CreateStaffModal from "./CreateStaffModal";
import AllStaffsTable from "./AllStaffsTable";
import LocalSearch from "../form/LocalSearch";

import { vietnameseSlug } from "../../common/utils";
import { useState, useEffect } from "react";
import { getDataCookies, setDataCookies } from "../../functions/cookie";

const AllStaffsPage = () => {
  const [visible, setVisible] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");
  const [keySelect, setKeySelect] = React.useState("code");
  const keys = ["staffCode", "fullName", "phone", "email"];
  const [staffs, setStaffs] = useState([]);

  const user = getDataCookies("LOGGED_IN_USER");

  useEffect(() => {
    fetch("http://localhost:8080/employees", {
      method: "GET",
      headers: {
        Authorization: user.token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStaffs(data.map(staff => ({staffCode:staff.code, fullName:staff.body.fullName, phone: staff.body.phoneNumber, role: staff.authority.substring(5), accountStatus: staff.accountStatus})));
        console.log(data);
      });
  }, []);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    toast.success("Created Successfully!");
    setVisible(false);
  };

  const handleRemove = () => {
    toast.error("Removed Successfully!");
  };

  const searched = (keyword) => (item) => vietnameseSlug(item[keySelect]).includes(keyword);
  const staffRole = (staffRole) => (item) => item.role === staffRole;

  const onFinish = ({ keySelect, keySearch }) => {
    setKeySelect(keySelect);
    setKeyword(vietnameseSlug(keySearch));
  };

  return (
    <Row style={{ margin: "0 12px" }} gutter={[24, 24]}>
      <CreateStaffModal visible={visible} onCreate={onCreate} onCancel={() => setVisible(false)} />
      <Col span={24}>
        <Card>
          <Row style={{ marginBottom: 24 }} justify="space-between">
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setVisible(true);
              }}
            >
              Thêm nhân viên
            </Button>
            <LocalSearch selectKeys={keys} onFinish={onFinish} />
          </Row>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Tất cả" key="1">
              <AllStaffsTable data={staffs.filter(searched(keyword))} handleRemove={handleRemove} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Điều phối" key="2">
              <AllStaffsTable data={staffs.filter(searched(keyword) && staffRole("coordinator"))} handleRemove={handleRemove} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Kế toán" key="3">
              <AllStaffsTable data={staffs.filter(searched(keyword) && staffRole("accountant"))} handleRemove={handleRemove} />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Giao hàng" key="4">
              <AllStaffsTable data={staffs.filter(searched(keyword) && staffRole("shipper"))} handleRemove={handleRemove} />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};

export default AllStaffsPage;
