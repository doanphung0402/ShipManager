import React from "react";
import { Link } from "react-router-dom";

import { vietnameseSlug, filters, onFilter, sorterByWords, setTagColor } from "../../common/utils";
// import CustomerDetailPage from "./CustomerDetailPage";
import { Table, Button, Typography, Space, Popconfirm, Tag, Statistic, Row } from "antd";
import { BsTrash, BsThreeDots, BsCheckLg, BsXLg } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

const AllStaffsTable = ({ data, handleRemove }) => {
  const [customerData, setCustomerData] = React.useState({});

  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "staffCode",
      key: "staffCode",
      width: 170,
      render: (text, record) => (
        <Typography.Link
          onClick={() => {
            console.log(record);
          }}
        >
          {text}
        </Typography.Link>
      ),
    },
    {
      title: "Tên nhân viên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text, record) => (
        <Row wrap={false} justify="space-between">
          <Typography.Text>{text}</Typography.Text>
          <Tag>{record.role}</Tag>
        </Row>
      ),
      // filters: filters(areas),
      // filterSearch: true,
      // onFilter: (value, record) => onFilter("fullName")(value, record),
      sorter: (a, b) => sorterByWords("fullName")(a, b),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (text, record) => <Typography.Text>{text}</Typography.Text>,
      sorter: (a, b) => a.phone - b.phone,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Tài khoản",
      dataIndex: "accountStatus",
      key: "accountStatus",
      width: 170,
      render: (text, record) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: <BsThreeDots size={24} />,
      dataIndex: "",
      key: "action",
      width: 120,
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/admin/category/${record.slug}`}>
            <Button size="large" type="text" icon={<BiEdit />}></Button>
          </Link>
          <Popconfirm
            title={
              <p>
                Sure to delete <b>{record.code}</b> ?
              </p>
            }
            placement="topRight"
            okText={<BsCheckLg />}
            cancelText={<BsXLg />}
            onConfirm={() => handleRemove(record.id)}
          >
           <Button size="large" type="text" danger icon={<BsTrash />}></Button>
          </Popconfirm>
        </Space>
      ),
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

export default AllStaffsTable;
