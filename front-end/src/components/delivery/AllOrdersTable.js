import React from "react";
import { Link } from "react-router-dom";

import { vietnameseSlug, filters, onFilter, sorterByWords, setTagColor } from "../../common/utils";
import OrderDetailModal from "./OrderDetailModal";
import { Table, Button, Typography, Space, Popconfirm, Tag } from "antd";

import { BsTrash, BsThreeDots, BsCheckLg, BsXLg} from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

import { status, areas } from "../../constant/initialValues";
const AllOrdersTable = ({ data, handleRemove }) => {
  const [visible, setVisible] = React.useState(false);
  const [orderData, setOrderData] = React.useState({});

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
      width: 100,
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
      title: "Khách hàng",
      dataIndex: "customerCode",
      key: "customerCode",
      width: 100,
      render: (text) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Địa điểm lấy hàng",
      dataIndex: "pickupAreaDetail",
      key: "pickupAreaDetail",
      render: (text, record) => (
        <Typography.Text>
          <b>{record.pickupArea}</b>, {text}
        </Typography.Text>
      ),
      filters: filters(areas),
      filterSearch: true,
      onFilter: (value, record) => onFilter("pickupArea")(value, record),
      sorter: (a, b) => sorterByWords("pickupArea")(a, b),
    },
    {
      title: "Địa điểm giao hàng",
      dataIndex: "deliveryAreaDetail",
      key: "deliveryAreaDetail",
      render: (text, record) => (
        <Typography.Text>
          <b>{record.deliveryArea}</b>, {text}
        </Typography.Text>
      ),
      filters: filters(areas),
      filterSearch: true,
      onFilter: (value, record) => onFilter("deliveryArea")(value, record),
      sorter: (a, b) => sorterByWords("deliveryArea")(a, b),
    },
    {
      title: "Chi tiết lấy hàng",
      dataIndex: "pickupStatus",
      key: "pickupStatus",
      width: 170,
      render: (text, record) =>
        text === "ready" ? (
          <Typography.Text>Đợi lấy hàng ------</Typography.Text>
        ) : text === "success" ? (
          <Typography.Text>
            Lấy hàng thành công, <b>{record.pickupBy}</b>, {record.pickupAt}
          </Typography.Text>
        ) : text === "processing" ? (
          <Typography.Text>
            Đang lấy hàng, <b>{record.pickupBy}</b>
          </Typography.Text>
        ) : (
          <Typography.Text>
            Lấy hàng thất bại, <b>{record.pickupBy}</b>, {record.pickupAt}
          </Typography.Text>
        ),
    },
    {
      title: "Chi tiết giao hàng",
      dataIndex: "deliveryStatus",
      key: "deliveryStatus",
      width: 170,
      render: (text, record) =>
        record.pickupStatus === "failed" || record.pickupStatus === "processing" || record.pickupStatus === "ready" ? (
          <Typography.Text>------</Typography.Text>
        ) : text === "success" ? (
          <Typography.Text>
            Đã giao thành công, <b>{record.deliveryBy}</b>, {record.deliveryAt}
          </Typography.Text>
        ) : text === "processing" ? (
          <Typography.Text>
            Đang giao, <b>{record.deliveryBy}</b>
          </Typography.Text>
        ) : (
          <Typography.Text>
            Giao thất bại, <b>{record.deliveryBy}</b>, {record.deliveryAt}
          </Typography.Text>
        ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => <Tag color={setTagColor(record.pickupStatus, record.deliveryStatus)}>{text}</Tag>,
      width: 140,
      filters: filters(status),
      onFilter: (value, record) => onFilter("status")(value, record),
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
      <OrderDetailModal order={orderData} visible={visible} setVisible={setVisible} />
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

export default AllOrdersTable;
