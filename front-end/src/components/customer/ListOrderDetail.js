import React from "react";
import { Descriptions, List, Row, Col, Avatar, Space, Typography, Tag, Button, Statistic, Tooltip, Popconfirm } from "antd";
import { BsTrashFill, BsFillPrinterFill, BsCardList, BsCheckLg, BsXLg } from "react-icons/bs";
import DetailOrderModal from "./DetailOrderModal";

const ListOrderDetail = ({ order }) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleRemove = (code) => {
    console.log(code);
  };

  const renderProductsList = (products) => (
    <List
      grid={{ gutter: 16, column: 3 }}
      style={{ margin: "0 -24px" }}
      dataSource={products}
      split={false}
      pagination={false}
      renderItem={(product) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar shape="square" size={64} gap={4}>
                {product}
              </Avatar>
            }
            title={<Typography.Text ellipsis>{product}</Typography.Text>}
            description={<Typography.Text ellipsis>{product}</Typography.Text>}
          />
        </List.Item>
      )}
    />
  );

  return (
    <Row gutter={[0, 16]}>
      <Col span={18}>
        <Descriptions size="small">
          <Descriptions.Item span={3} label="Mã đơn hàng">
            <Space>
              <Typography.Link onClick={showModal}>{order.code}</Typography.Link> <Tag color={"processing"}>{order.status}</Tag>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Người nhận">
            {order.body.receiver.fullName}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Giao tới">
            {order.body.receiver.addressInfo.address}, {order.body.receiver.addressInfo.area}
          </Descriptions.Item>
          <Descriptions.Item span={3} label="Ghi chú">
            {order.body.note}
          </Descriptions.Item>
        </Descriptions>
      </Col>
      <Col span={6} style={{ display: "flex" }}>
        <Space style={{ marginLeft: "auto" }} align="end" direction="vertical" size={16}>
          <Space>
            <Tooltip title="Xem chi tiết đơn hàng" placement="topRight">
              <Button type="text" icon={<BsCardList size={20} />} onClick={showModal}></Button>
            </Tooltip>
            <Tooltip title="In đơn hàng" placement="topRight">
              <Button type="link" icon={<BsFillPrinterFill size={20} />}></Button>
            </Tooltip>
            <Popconfirm
              title={
                <p style={{ margin: 0 }}>
                  <b>{order.code}</b> chưa được giao,
                  <br /> bạn chắc chắn muốn xóa ?
                </p>
              }
              placement="topRight"
              okText={<BsCheckLg />}
              cancelText={<BsXLg />}
              onConfirm={() => handleRemove(order.code)}
            >
              <Button type="text" danger icon={<BsTrashFill size={20} />}></Button>
            </Popconfirm>
          </Space>
          <Statistic title="COD" suffix="₫" value={order.body.codMoney} />
        </Space>
      </Col>
      <Col span={24}>{renderProductsList(order.body.productsList)}</Col>
      <DetailOrderModal visible={visible} setVisible={setVisible} order={order} />
    </Row>
  );
};

export default ListOrderDetail;
