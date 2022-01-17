import React from "react";
import { Table, Typography, Avatar } from "antd";

const OrderProductsTable = ({ data }) => {
  const columns = [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 170,
      render: (text, record) => (
        <Avatar shape="square" size={64} gap={4}>
          {text}
        </Avatar>
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: 170,
      render: (text, record) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Mô tả",
      dataIndex: "desc",
      key: "desc",
      width: 170,
      render: (text, record) => <Typography.Text>{text}</Typography.Text>,
    },
  ];
  return <Table columns={columns} footer={() => ""} rowKey={(record) => record.name} dataSource={data} size="default" pagination={false} />;
};

export default OrderProductsTable;
