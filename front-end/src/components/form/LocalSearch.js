import React from "react";
import { Divider, Card, Button, Form, Input, Select, Space } from "antd";

import { FaSearch } from "react-icons/fa";
import { dataKeys } from "../../constant/initialValues";

const LocalSearch = ({ selectKeys, onFinish }) => {
  const [form] = Form.useForm();
  const getDataByKey = (arr) => {
    let res = [];
    arr.forEach((e) => {
      res.push(dataKeys.filter((item) => item.dataKey === e)[0]);
    });
    return res;
  };
  let keysList = getDataByKey(selectKeys);

  return (
    <Card size="small" style={{ padding: 0, marginLeft: "auto" }} type="inner">
      <Form form={form} size="large" onFinish={onFinish}>
        <Space split={<Divider type="vertical" />}>
          <Form.Item name="keySelect" initialValue={keysList[0].dataKey} noStyle>
            <Select style={{ width: "170px" }} bordered={false}>
              {keysList.map((item) => (
                <Select.Option key={item.dataKey} value={item.dataKey}>
                  {item.text}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="keySearch" noStyle>
            <Input
              bordered={false}
              style={{ width: "400px", paddingRight: 4 }}
              placeholder="Tìm kiếm trong bảng..."
              allowClear
              suffix={
                <Button type="primary" htmlType="submit" size="middle">
                  <FaSearch size={18} />
                </Button>
              }
            />
          </Form.Item>
        </Space>
      </Form>
    </Card>
  );
};

export default LocalSearch;
