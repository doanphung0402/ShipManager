import React from "react";
import { getArea } from "../../common/utils";
import { Tabs, Row, Form, Col, Tag, PageHeader, Space, Button, Statistic, Descriptions, Divider, Typography, Avatar } from "antd";

const CustomerPageHeader = ({ data }) => {
  const setTagColor = (role = "") => {
    if (role === "admin") return "red";
    if (role === "coordinator") return "orange";
    if (role === "accountant") return "gold";
    if (role === "shipper") return "blue";
    if (role === "customer") return "cyan";
  };
  const renderContent = (column = 2) => (
    <Descriptions size="middle" column={column}>
      {/* <Descriptions.Item label="Số điện thoại">{data.phone}</Descriptions.Item> */}
      <Descriptions.Item label="Mã số thuế">{data.body.taxCode ?? "------"}</Descriptions.Item>
      <Descriptions.Item label="Email">{data.body.email}</Descriptions.Item>
      {/* <Descriptions.Item label="Ngày tạo">{data.createdAt}</Descriptions.Item>
      <Descriptions.Item label="Ngày cập nhật">{data.updatedAt}</Descriptions.Item> */}
      <Descriptions.Item span={2} label="Địa chỉ">
        {getArea(data.body.addressInfo.area)}, {data.body.addressInfo.address}
      </Descriptions.Item>
    </Descriptions>
  );
  const extraContent = (
    <Space direction="vertical" align="end">
      <Space size={0} align="end" split={<Divider type="vertical" style={{ height: 54 }} />}>
        <Statistic title="COD" valueStyle={{ fontSize: 20 }} value={100000} />
        <Statistic valueStyle={{ fontSize: 20 }} style={{ width: 120 }} title="Phí vận chuyển" value={100000} />
        <Statistic title="Hoàn trả" valueStyle={{ fontSize: 20 }} value={100000} />
      </Space>
      <Statistic title="Tổng công nợ" valueStyle={{ color: "orange" }} value={100000} suffix="₫" />
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
      title={data.body.fullName}
      subTitle={data.code}
      avatar={{ size: 50, src: `https://source.unsplash.com/random?vietnam,nature${data.body.fullName}` }}
      tags={<Tag color={setTagColor(data.accountStatus)}>{data.accountStatus}</Tag>}
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

export default CustomerPageHeader;
