import React, { useEffect, useState } from "react";

import { vietnameseSlug } from "../../common/utils";
import ReturnedTable from "./ReturnedTable";
import LocalSearch from "../form/LocalSearch";
import * as OrderService from "../../functions/order"
import { toast } from "react-toastify";
import { Card, Row, Col, Form, Select, Button, Space, Typography } from "antd";

// import { dataOrders } from "../../constant/initialValues";

const ReturnedPage = () => {
  const [dataOrders,setDataOrders] =useState([]); 
  useEffect(()=>{
     OrderService.getAllOrderReturn().then(data=>{
      setDataOrders(data.data); 
     })
  },[])
  const [form] = Form.useForm();
  const [keyword, setKeyword] = React.useState("");
  const [keySelect, setKeySelect] = React.useState("code");
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const keys = ["code", "customerCode", "pickupAreaDetail", "deliveryAreaDetail", "pickupBy", "deliveryBy"];
  const configSelect = {
    rules: [{ required: true, message: "Hãy chọn giá trị!" }],
  };

  const searched = (keyword) => (item) => vietnameseSlug(item[keySelect]).includes(keyword);

  const handleSearch = ({ keySelect, keySearch }) => {
    setKeySelect(keySelect);
    setKeyword(vietnameseSlug(keySearch));
  };
  const handleSubmit = ({ pickupBy }) => {
    if (selectedRowKeys.length > 0) toast.success(`Thành công! ${selectedRowKeys.length} đơn hàng được thông báo đến ${pickupBy}`);
    else toast.error("Thất bại! Chưa chọn đơn hàng");
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const renderForm = () => {
    return (
      <Form form={form} size="large" layout="inline" requiredMark={false} onFinish={handleSubmit}>
        <Form.Item colon={false} name="pickupBy" label="Nhân viên trả hàng" {...configSelect}>
          <Select
            style={{ width: 320 }}
            placeholder="Chọn nhân viên trả hàng..."
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            {dataOrders.map((item) => (
              <Select.Option key={item.pickupBy} value={item.pickupBy}>
                {item.pickupBy}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Điều phối
            </Button>
            {selectedRowKeys.length > 0 ? (
              <span>
                <b>{selectedRowKeys.length}</b> đơn hàng
              </span>
            ) : (
              ""
            )}
          </Space>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Row style={{ margin: "0 12px" }} gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Điều phối trả hàng
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Card>{renderForm()}</Card>
      </Col>
      <Col span={24}>
        <Card title="Danh sách đơn hàng">
          <Row justify="start" style={{ marginBottom: 24 }}>
            <LocalSearch selectKeys={keys} onFinish={handleSearch} />
          </Row>
          <ReturnedTable
            data={dataOrders.filter(searched(keyword)).filter((item) => item.pickupStatus === "success" && item.deliveryStatus === "failed")}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={onSelectChange}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default ReturnedPage;
