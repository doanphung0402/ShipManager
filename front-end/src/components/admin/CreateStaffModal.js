import React from "react";

import { toast } from "react-toastify";
import { Button, Form, Row, Col, Card, Typography, Space, Divider, Input, InputNumber, Radio, Modal } from "antd";

const CreateStaffModal = ({ visible, onCancel, onCreate }) => {
  const [form] = Form.useForm();
  const configInput = {
    rules: [{ required: true, message: "Trường này chưa nhập giá trị!" }],
  };
  const configSelect = {
    rules: [{ required: true, message: "Hãy chọn giá trị!" }],
  };

  const renderTitle = () => {
    return (
      <Space size={24}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Thêm nhân viên
        </Typography.Title>
      </Space>
    );
  };

  const renderOrderDetailForm = () => {
    return (
      <Form form={form} layout="vertical" size="large" requiredMark={true}>
        <Form.Item name="role" initialValue={"coordinator"} {...configSelect}>
          <Radio.Group buttonStyle="solid" size="middle">
            <Space size={0}>
              <Radio.Button value="coordinator">Điều phối</Radio.Button>
              <Radio.Button value="shipper">Vận chuyển</Radio.Button>
              <Radio.Button value="accountant">Kế toán</Radio.Button>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="fullName" label="Tên nhân viên" {...configInput}>
          <Input placeholder="Nhập tên nhân viên..." />
        </Form.Item>
        <Form.Item name="email" label="Email" {...configInput}>
          <Input type="email" placeholder="Nhập email..." />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại" {...configInput}>
          <Input type="number" placeholder="Nhập số điện thoại..." />
        </Form.Item>
        <Form.Item name="password" label="Mật khẩu" {...configInput}>
          <Input.Password placeholder="Nhập mật khẩu..." />
        </Form.Item>
      </Form>
    );
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleCancel = () => {
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title="Thêm nhân viên mới"
      footer={[
        <Button key="back" size="large" type="text" onClick={handleCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" size="large" onClick={handleOk}>
          Thêm nhân viên
        </Button>,
      ]}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      {renderOrderDetailForm()}
    </Modal>
  );
};

export default CreateStaffModal;
