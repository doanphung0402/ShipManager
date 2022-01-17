import React from "react";
import { Link } from "react-router-dom";

import { vietnameseSlug, filters, onFilter, sorterByWords, setTagColor } from "../../common/utils";

import { Table, Button, Typography, Space, Popconfirm, Tag, Statistic } from "antd";

const AllCustomersTable = ({ data }) => {
  const [customerData, setCustomerData] = React.useState({});

  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "code",
      key: "code",
      width: 170,
      render: (text, record) => <Link to={`/customers/${text}`}>{text}</Link>,
    },
    {
      title: "Tên khách hàng",
      dataIndex: ["body", "fullName"],
      key: "fullName",
      render: (text, record) => <Typography.Text>{text}</Typography.Text>,
      // filters: filters(areas),
      // filterSearch: true,
      // onFilter: (value, record) => onFilter("fullName")(value, record),
      sorter: (a, b) => sorterByWords("fullName")(a, b),
    },
    // {
    //   title: "Số điện thoại",
    //   dataIndex: "phone",
    //   key: "phone",
    //   render: (text, record) => <Typography.Text>{text}</Typography.Text>,
    //   sorter: (a, b) => a.phone - b.phone,
    // },
    {
      title: "Tổng COD",
      dataIndex: ["ordersMustReturnCod", "cod"],
      key: "cod",
      width: 180,
      render: (text, record) => <Statistic value={text}></Statistic>,
      sorter: (a, b) => a.cod - b.cod,
    },
    // {
    //   title: "Tổng phí vận chuyển",
    //   dataIndex: "deliveryMoney",
    //   key: "deliveryMoney",
    //   width: 200,
    //   render: (text, record) => <Statistic value={text}></Statistic>,
    //   sorter: (a, b) => a.deliveryMoney - b.deliveryMoney,
    // },
    // {
    //   title: "Tổng phí hoàn trả",
    //   dataIndex: "returnMoney",
    //   key: "returnMoney",
    //   width: 180,
    //   render: (text, record) => <Statistic value={text}></Statistic>,
    //   sorter: (a, b) => a.returnMoney - b.returnMoney,
    // },
    {
      title: "Tổng",
      dataIndex: ["ordersMustReturnCod", "cod"],
      key: "all",
      width: 180,
      render: (text, record) => <Statistic value={text} suffix="₫"></Statistic>,
      sorter: (a, b) => a.all - b.all,
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

export default AllCustomersTable;
