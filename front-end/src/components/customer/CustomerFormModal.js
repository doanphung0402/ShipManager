import React from "react";

import { toast } from "react-toastify";
import { Modal, Form, Row, Col, Card, Typography, Space, Tooltip, Anchor, Input, Select, Button } from "antd";
import { FaMapMarkerAlt } from "react-icons/fa";

import { areas } from "../../constant/initialValues";
import { vietnameseSlug } from "../../common/utils";
import { getDataCookies } from "../../functions/cookie";
import { getCustomerInfo } from "../../functions/customer";

const CustomerFormModal = () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = React.useState(false);
  const [customerArea, setCustomerArea] = React.useState("");
  const [customerAddress, setCustomerAddress] = React.useState("");

  const user = getDataCookies("LOGGED_IN_USER");

  React.useEffect(() => {
    loadCustomerInfo();
  }, []);

  const loadCustomerInfo = () =>
    getCustomerInfo(user.token)
      .then((res) => {
        const customerInfo = res.data;
        setCustomerArea(customerInfo.body.addressInfo.area);
        setCustomerAddress(customerInfo.body.addressInfo.address);

        form.setFieldsValue({
          customerName: customerInfo.body.fullName,
          customerPhone: customerInfo.body.taxCode,
          customerArea: customerInfo.body.addressInfo.area,
          customerAddress: customerInfo.body.addressInfo.address,
        });
      })
      .catch((err) => console.log(err));

  const onSubmit = (values) => {
    console.log("Received values of form: ", values);
    setCustomerArea(values.customerArea);
    setCustomerAddress(values.customerAddress);
    setVisible(false);
  };

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

  const formModal = () => (
    <Modal
      bordered={false}
      title="Thông tin lấy hàng"
      visible={visible}
      okText="Cập nhật"
      cancelText="Hủy"
      onCancel={() => setVisible(false)}
      onOk={() => {
        form
          .validateFields()
          .then((values) => onSubmit(values))
          .catch((err) => console.log(err));
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item {...layout} name="customerName" label="Người tạo đơn" {...configSelect}>
          <Input placeholder="Nhập tên người tạo đơn" />
        </Form.Item>
        <Form.Item {...layout} name="customerArea" label="Quận/Khu vực" {...configSelect}>
          <Select
            placeholder="Chọn khu vực..."
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => vietnameseSlug(option.children, " ").indexOf(vietnameseSlug(input, " ")) >= 0}
          >
            {areas.map((item) => (
              <Select.Option key={vietnameseSlug(item, "_")} value={vietnameseSlug(item, "_").toUpperCase()}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...layout} name="customerPhone" label="Số điện thoại" {...configInput}>
          <Input style={{ width: "100%" }} type="tel" pattern="[0]{1}[0-9]{9}" placeholder="Nhập số điện thoại..." />
        </Form.Item>
        <Form.Item {...layout} name="customerAddress" label="Địa chỉ" {...configInput}>
          <Input.TextArea maxLength={300} placeholder="Nhập địa chỉ..." />
        </Form.Item>
      </Form>
    </Modal>
  );
  return (
    <Card>
      <Row justify="space-between">
        <Typography.Text>
          <FaMapMarkerAlt /> Đơn hàng sẽ được lấy tại:{" "}
          <Typography.Link>
            <b>{customerAddress}</b>, {customerArea}
          </Typography.Link>
        </Typography.Text>
        <Button size="middle" onClick={() => setVisible(true)}>
          Chỉnh sửa
        </Button>
        {formModal()}
      </Row>
    </Card>
  );
};

export default CustomerFormModal;
