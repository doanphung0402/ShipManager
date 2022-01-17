import React from "react";
import { Tabs, Row, Form, Col, Tag, PageHeader, Space, Button, Statistic, Descriptions, Divider, Typography, Avatar } from "antd";

const StaffPageHeader = ({ data }) => {
  const setTagColor = (role = "") => {
    if (role === "admin") return "red";
    if (role === "coordinator") return "orange";
    if (role === "accountant") return "gold";
    if (role === "shipper") return "blue";
    if (role === "customer") return "cyan";
  };
  const renderContent = (column = 2) => (
    <Descriptions size="middle" column={column}>
      <Descriptions.Item label="Ngày sinh">{data.birthDay}</Descriptions.Item>
      <Descriptions.Item label="Nhóm khách hàng">{data.customerType}</Descriptions.Item>
      <Descriptions.Item label="Số điện thoại">{data.phone}</Descriptions.Item>
      <Descriptions.Item label="Mã số thuế">{data.taxNo ?? "------"}</Descriptions.Item>
      <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
      <Descriptions.Item label="Website">{data.website ?? "------"}</Descriptions.Item>
      <Descriptions.Item label="Ngày tạo">{data.createdAt}</Descriptions.Item>
      <Descriptions.Item label="Ngày cập nhật">{data.updatedAt}</Descriptions.Item>
      <Descriptions.Item span={2} label="Địa chỉ">
        {data.address}
      </Descriptions.Item>
    </Descriptions>
  );
  const extraContent = (
    <Space size={[8, 24]} wrap align="end">
      <Space size={0} align="end" split={<Divider type="vertical" style={{ height: 54 }} />}>
        <Statistic title="COD" valueStyle={{ fontSize: 22 }} value={100000} />
        <Statistic valueStyle={{ fontSize: 22 }} style={{ width: 120 }} title="Phí vận chuyển" value={100000} />
        <Statistic title="Hoàn trả" valueStyle={{ fontSize: 22 }} value={100000} />
      </Space>
      <Statistic title="Tổng công nợ" valueStyle={{ color: "orange" }} value={100000} suffix="VNĐ" />
    </Space>
  );

  const Content = ({ children, extra }) => (
    <Space size={24} align="start">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </Space>
  );
  return (
    <PageHeader
      style={{ padding: 0 }}
      title={data.fullName}
      subTitle={data.customerCode}
      avatar={{ size: 50, src: "https://source.unsplash.com/random?vietnam,nature" }}
      tags={<Tag color={setTagColor(data.role)}>{data.role}</Tag>}
      extra={[
        <Button key="print" type="primary">
          Thanh toán công nợ
        </Button>,
      ]}
    >
      <Content extra={extraContent}>{renderContent()}</Content>
    </PageHeader>
  );
};

export default StaffPageHeader;
