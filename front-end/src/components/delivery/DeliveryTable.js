import React from "react";
import { vietnameseSlug, filters, onFilter, sorterByWords, setTagColor } from "../../common/utils";
import OrderDetailModal from "./OrderDetailModal";
import { Table, Typography, Tag, Space, Button, Tooltip, Row } from "antd";
import { status, areas } from "../../constant/initialValues";

const DeliveryTable = ({ data, selectedRowKeys, onSelectChange }) => {
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
      sorter: (a, b) => sorterByWords( "pickupArea")(a, b),
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
      sorter: (a, b) => sorterByWords( "deliveryArea")(a, b),
    },
    {
      title: "Ngày tạo đơn",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 140,
      render: (text, record) => <Typography.Text>{text}</Typography.Text>,
    },
    {
      title: "Thời gian giao dự kiến",
      dataIndex: "",
      key: "deliveryTime",
      width: 140,
      render: (record) => <Typography.Text>{record.createdAt + "2"}</Typography.Text>,
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
  ];

  return (
    <>
      <OrderDetailModal order={orderData} visible={visible} setVisible={setVisible} />
      <Table
        rowSelection={{ selectedRowKeys, onChange: onSelectChange }}
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

export default DeliveryTable;
