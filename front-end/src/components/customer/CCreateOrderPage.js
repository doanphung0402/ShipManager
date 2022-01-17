import React from "react";

import { toast } from "react-toastify";
import { Modal, Steps, Button, Form, Row, Col, Card, Typography, Space, Tooltip, Anchor, Input, Select, InputNumber } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";

import { areas } from "../../constant/initialValues";
import CustomerFormModal from "./CustomerFormModal";
import { vietnameseSlug } from "../../common/utils";
import { getDataCookies } from "../../functions/cookie";
import { getCustomerInfo } from "../../functions/customer";
import { getOrderShipCost, createOrderByCustomer } from "../../functions/order";

const CCreateOrderPage = () => {
  const [form] = Form.useForm();
  const [customerArea, setCustomerArea] = React.useState("");
  const [receiverArea, setReceiverArea] = React.useState("");
  const [orderWeight, setOrderWeight] = React.useState(0);
  const [shipCost, setShipCost] = React.useState(0);
  const [orderCOD, setOrderCOD] = React.useState(0);

  const user = getDataCookies("LOGGED_IN_USER");

  React.useEffect(() => {
    loadCustomerInfo();
  }, []);

  const loadCustomerInfo = () =>
    getCustomerInfo(user.token)
      .then((res) => setCustomerArea(res.data.body.addressInfo.area))
      .catch((err) => console.log(err));

  React.useEffect(() => {
    if (orderWeight > 0 && receiverArea) {
      const getShipCost = () =>
        getOrderShipCost(customerArea, receiverArea, orderWeight)
          .then((res) => {
            form.setFieldsValue({ orderShipCost: res.data.shipMoney });
            setShipCost(res.data.shipMoney);
          })
          .catch((err) => console.log(err));
      getShipCost();
    } else {
      form.setFieldsValue({ orderShipCost: 0 });
    }
  }, [receiverArea, orderWeight, customerArea]);

  React.useEffect(() => {
    if (shipCost > 0 && orderCOD > 0) {
      form.setFieldsValue({ orderTotal: shipCost + orderCOD });
    } else {
      form.setFieldsValue({ orderTotal: 0 });
    }
  }, [shipCost, orderCOD]);

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };
  const configInput = {
    rules: [{ required: true, message: "Trường này chưa nhập giá trị!" }],
  };
  const configSelect = {
    rules: [{ required: true, message: "Hãy chọn giá trị!" }],
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    createOrderByCustomer(values, user.token)
      .then((res) => {
        toast.success(
          <>
            <b>{res.data.code}</b> đã được tạo thành công
          </>
        );
      })
      .catch((err) => console.log(err));
  };

  const renderShipForm = () => {
    return (
      <Card id="giao-hang" bordered={false} title="Thông tin giao hàng">
        <Form.Item {...layout} name="receiverName" label="Người nhận" {...configSelect}>
          <Input placeholder="Nhập tên người nhận" />
        </Form.Item>
        <Form.Item {...layout} name="receiverArea" label="Quận/Khu vực" {...configSelect}>
          <Select
            placeholder="Chọn khu vực..."
            showSearch
            optionFilterProp="children"
            onSelect={(value) => setReceiverArea(value)}
            filterOption={(input, option) => vietnameseSlug(option.children, " ").indexOf(vietnameseSlug(input, " ")) >= 0}
          >
            {areas.map((item) => (
              <Select.Option key={vietnameseSlug(item, "_")} value={vietnameseSlug(item, "_").toUpperCase()}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...layout} name="receiverPhone" label="Số điện thoại" {...configInput}>
          <Input type="tel" pattern="[0]{1}[0-9]{9}" style={{ width: "100%" }} placeholder="Nhập số điện thoại..." />
        </Form.Item>
        <Form.Item {...layout} name="receiverAddress" label="Địa chỉ" {...configInput}>
          <Input.TextArea maxLength={300} placeholder="Nhập địa chỉ..." />
        </Form.Item>
      </Card>
    );
  };

  const renderOrderDetailForm = () => {
    return (
      <Card id="chi-tiet" bordered={false} title="Chi tiết đơn hàng">
        <Form.Item name="orderProducts" label="Danh sách sản phẩm" tooltip="Sản phẩm ngăn cách khi Enter" {...configInput}>
          <Select mode="tags" placeholder="Nhập danh sách sản phẩm..." style={{ width: "100%" }} allowClear tokenSeparators={["\n"]} open={false}></Select>
        </Form.Item>
        <Form.Item name="orderWeight" label="Khối lượng" {...configInput}>
          <InputNumber
            onChange={(value) => setOrderWeight(value)}
            min={0}
            style={{ width: "100%" }}
            addonAfter="kg"
            step={0.5}
            placeholder="Nhập tổng khối lượng đơn hàng..."
          />
        </Form.Item>
        <Form.Item name="orderCOD" label="COD" {...configInput} tooltip="Phí thu hộ">
          <InputNumber
            min={0}
            onChange={(value) => setOrderCOD(value)}
            style={{ width: "100%" }}
            controls={false}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            step={1000}
            placeholder="Nhập phí COD..."
          />
        </Form.Item>
        <Form.Item name="orderNote" label="Ghi chú">
          <Input.TextArea showCount maxLength={300} placeholder="Hàng dễ vỡ..." />
        </Form.Item>
      </Card>
    );
  };
  const renderOrderDetailCost = () => {
    return (
      <Card id="chi-phi" bordered={false} title="Chi phí đơn hàng">
        <Form.Item
          name="orderShipCost"
          label="Phí vận chuyển"
          tooltip="Tính theo khoảng cách và khối lượng đơn hàng."
          style={{ flexDirection: "row", rowGap: 16, flexWrap: "nowrap" }}
        >
          <InputNumber
            min={1}
            readOnly
            bordered={false}
            controls={false}
            style={{ width: "auto" }}
            formatter={(value) => `${value}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            step={1000}
            placeholder="Phí vận chuyển..."
          />
        </Form.Item>
        <Form.Item name="orderDiscount" label="Chiết khấu dịch vụ" initialValue={0} style={{ flexDirection: "row", rowGap: 16, flexWrap: "nowrap" }}>
          <InputNumber
            min={0}
            max={99}
            readOnly
            bordered={false}
            controls={false}
            style={{ width: "auto" }}
            formatter={(value) => `${value}%`}
            parser={(value) => value.replace("%", "")}
            placeholder="Nhập chiết khấu..."
          />
        </Form.Item>
        <Form.Item
          name="orderTotal"
          label={<Typography.Link strong>Tổng hóa đơn</Typography.Link>}
          style={{ flexDirection: "row", rowGap: 16, flexWrap: "nowrap" }}
        >
          <InputNumber
            min={1}
            readOnly
            bordered={false}
            controls={false}
            style={{ width: "auto" }}
            formatter={(value) => `${value}₫`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            step={1000}
            placeholder="Tổng hóa đơn..."
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Tạo đơn hàng
          </Button>
        </Form.Item>
      </Card>
    );
  };

  return (
    <Row justify="center" align="middle" style={{ width: "100%", minHeight: "100vh", padding: "24px 0" }}>
      <Col span={18}>
        <Typography.Title level={2} align="center">
          Tạo đơn hàng
        </Typography.Title>
        <div style={{ position: "absolute", right: 0 }}>
          <Anchor targetOffset={window.innerHeight / 2} offsetTop={80} style={{ padding: 8, width: "max-content" }}>
            <Anchor.Link href="#giao-hang" title={<p style={{ marginBottom: 2 }}>Thông tin giao hàng</p>} />
            <Anchor.Link href="#chi-tiet" title={<p style={{ marginBottom: 2 }}>Chi tiết đơn hàng</p>} />
            <Anchor.Link href="#chi-phi" title={<p style={{ marginBottom: 2 }}>Chi phí đơn hàng</p>} />
          </Anchor>
        </div>
      </Col>
      <Col span={18}>
        <Row justify="center">
          <Form form={form} layout="vertical" size="large" requiredMark={true} onFinish={onFinish}>
            <Row gutter={[16, 16]} justify="center">
              <Col span={16}>
                <CustomerFormModal />
              </Col>
              <Col span={16}>{renderShipForm()}</Col>
              <Col span={16}>{renderOrderDetailForm()}</Col>
              <Col span={16}>{renderOrderDetailCost()}</Col>
            </Row>
          </Form>
        </Row>
      </Col>
    </Row>
  );
};

export default CCreateOrderPage;
