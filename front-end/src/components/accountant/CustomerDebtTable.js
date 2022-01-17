import React from "react";
import { Link } from "react-router-dom";

import { vietnameseSlug, filters, onFilter, sorterByWords, setTagColor } from "../../common/utils";
import CustomerDetailPage from "./CustomerDetailPage";
import { Table, Button, Typography, Space, Popconfirm, Tag, Statistic } from "antd";

const CustomerDebtTable = ({ data }) => {
  const [customerData, setCustomerData] = React.useState({});

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      width: 170,
      render: (text, record) => (
        <Typography.Link
          onClick={() => {
            setCustomerData(record);
          }}
        >
          {text}
        </Typography.Link>
      ),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => <Typography.Text>{text}</Typography.Text>,
      // filters: filters(areas),
      // filterSearch: true,
      // onFilter: (value, record) => onFilter("fullName")(value, record),
      sorter: (a, b) => sorterByWords(a, b, "fullName"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (text, record) => <Typography.Text>{text}</Typography.Text>,
      sorter: (a, b) => a.phone - b.phone,
    },
    {
      title: "Tổng COD",
      dataIndex: "cod",
      key: "cod",
      width: 180,
      render: (text, record) => <Statistic value={text}></Statistic>,
      sorter: (a, b) => a.cod - b.cod,
    },
    {
      title: "Tổng phí vận chuyển",
      dataIndex: "deliveryMoney",
      key: "deliveryMoney",
      width: 200,
      render: (text, record) => <Statistic value={text}></Statistic>,
      sorter: (a, b) => a.deliveryMoney - b.deliveryMoney,
    },
    {
      title: "Tổng phí hoàn trả",
      dataIndex: "returnMoney",
      key: "returnMoney",
      width: 180,
      render: (text, record) => <Statistic value={text}></Statistic>,
      sorter: (a, b) => a.returnMoney - b.returnMoney,
    },
    {
      title: "Tổng phí hoàn trả",
      dataIndex: "needToPay",
      key: "needToPay",
      width: 180,
      render: (text, record) => <Statistic value={text}></Statistic>,
      sorter: (a, b) => a.returnMoney - b.returnMoney,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => <Tag color={setTagColor(record.pickupStatus, record.deliveryStatus)}>{text}</Tag>,
      width: 140,
      // filters: filters(status),
      // onFilter: (value, record) => onFilter("status")(value, record),
    },
  ];

  return (
    <>
      {/* <CustomerDetailPage data={customerData} /> */}
      <Table
        columns={columns}
        footer={() => ""}
        rowKey={(record) => record.id}
        dataSource={data}
        size="default"
        pagination={{
          total: data.length,
          showTotal: (total) => (
            <p style={{ marginRight: 16 }}>
              Total <b>{total}</b> items
            </p>
          ),
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "50"],
        }}
      />
    </>
  );
};

export default CustomerDebtTable;
