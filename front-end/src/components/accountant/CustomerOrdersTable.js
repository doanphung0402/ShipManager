import React from "react";
import { Link } from "react-router-dom";

import { vietnameseSlug, filters, onFilter, sorterByWords, setTagColor, formatDate, sorterByDate } from "../../common/utils";
import OrderDetailModal from "../delivery/OrderDetailModal";
import { Table, Typography, Tag, Statistic } from "antd";

const CustomerOrdersTable = ({ data }) => {
  const [visible, setVisible] = React.useState(false);
  const [orderData, setOrderData] = React.useState({});

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
      width: 170,
      render: (text, record) => (
        <Typography.Link
          onClick={() => {
            setVisible(true);
            setOrderData(record);
          }}
        >
          {text}
        </Typography.Link>
      ),
    },
    {
      title: "Ngày tạo đơn",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) => <Typography.Text>{formatDate(text)}</Typography.Text>,
      sorter: (a, b) => sorterByDate("createdAt")(a, b),
    },
    // {
    //   title: "Ngày cập nhật",
    //   dataIndex: "updatedAt",
    //   key: "updatedAt",
    //   render: (text, record) => <Typography.Text>{text}</Typography.Text>,
    // },
    {
      title: "COD",
      dataIndex: ["body", "codMoney"],
      key: "codMoney",
      width: 180,
      render: (text, record) => <Statistic value={text} />,
      sorter: (a, b) => a.body.codMoney - b.body.codMoney,
    },
    {
      title: "Phí vận chuyển",
      dataIndex: ["body", "shipMoney"],
      key: "orderShipCost",
      width: 200,
      render: (text, record) => <Statistic value={text} />,
      sorter: (a, b) => a.body.shipMoney - b.body.shipMoney,
    },
    // {
    //   title: "Hoàn trả",
    //   dataIndex: "returnMoney",
    //   key: "returnMoney",
    //   width: 180,
    //   render: (text, record) => <Statistic value={text} />,
    //   sorter: (a, b) => a.returnMoney - b.returnMoney,
    // },
    // {
    //   title: "Còn phải trả",
    //   dataIndex: "needToPay",
    //   key: "needToPay",
    //   width: 180,
    //   render: (text, record) => <Statistic value={text} suffix="VNĐ" />,
    //   sorter: (a, b) => a.returnMoney - b.returnMoney,
    // },
    {
      title: "Trạng thái",
      dataIndex: ["paymentStatusInfo", "paymentStatus"],
      key: "paymentStatus",
      render: (text, record) => <Tag color={setTagColor(record.paymentStatusInfo.paymentStatus, "")}>{text}</Tag>,
      width: 140,
      // filters: filters(status),
      // onFilter: (value, record) => onFilter("status")(value, record),
    },
  ];

  return (
    <>
      <OrderDetailModal order={orderData} visible={visible} setVisible={setVisible} />
      <Table
        columns={columns}
        footer={() => ""}
        rowKey={(record) => record.code}
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

export default CustomerOrdersTable;
