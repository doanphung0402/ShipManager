import React from "react";
import { Link, useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import { Button, Form, Row, Col, Typography, Space, Tooltip, Input, Select } from "antd";
import { FaMapMarkedAlt, FaUserAlt, FaPhoneAlt, FaLock } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import "./style.css";

import { areas } from "../../constant/initialValues";
import { vietnameseSlug } from "../../common/utils";
import { createCustomer } from "../../functions/auth";
import { getDataCookies } from "../../functions/cookie";
import Loader from "../../components/loader/Loader";

const Signup = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  let history = useHistory();

  const user = getDataCookies("LOGGED_IN_USER");

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  const onFinish = (values) => {
    setLoading(true);
    createCustomer(values)
      .then((res) => {
        window.localStorage.setItem("dataRegistration", values.phoneNumber);
        // clear state
        form.resetFields();
        setLoading(false);
        history.push("/login");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          <>
            Oops, đã có lỗi xảy ra <b>{values.phoneNumber}</b>!
          </>
        );
        console.log(error);
      });
  };

  return (
    <div className="form_wrapper">
      {loading && <Loader />}
      <div className="form_container">
        <Row align="middle">
          <Col span={12} className="form_left">
            <div>
              <img height={64} src="https://accounts.sapo.vn/images/Sapo-logo.svg" alt="logo" />
            </div>

            <div style={{ borderBottom: "3px solid #4087eb", marginBottom: 16 }}>
              <Typography.Link strong style={{ fontSize: 32 }}>
                Đăng ký
              </Typography.Link>
            </div>

            <Form form={form} layout="vertical" size="large" requiredMark={false} onFinish={onFinish}>
              <Form.Item name="area" rules={[{ required: true, message: "Bạn chưa chọn khu vực!" }]}>
                <Select
                  placeholder={
                    <Space size={4}>
                      <FaMapMarkedAlt size={20} />
                      Chọn khu vực cửa hàng...
                    </Space>
                  }
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
              <Form.Item name="fullName" rules={[{ required: true, message: "Bạn chưa nhập họ tên!" }]}>
                <Input prefix={<FaUserAlt />} placeholder="Nhập họ tên..." />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: "Bạn chưa nhập Số điện thoại!" },
                  { max: 12, message: "Số điện thoại không được quá 12 kí tự" },
                ]}
              >
                <Input prefix={<FaPhoneAlt />} type="tel" pattern="[0]{1}[0-9]{9}" placeholder="Nhập số điện thoại..." />
              </Form.Item>
              <Form.Item name="password" hasFeedback rules={[{ required: true, message: "Bạn chưa nhập mật khẩu!" }]}>
                <Input.Password prefix={<FaLock />} placeholder="Nhập mật khẩu..." />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Bạn chưa xác nhận mật khẩu!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu xác nhận chưa khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<FaLock />} placeholder="Xác nhận mật khẩu..." />
              </Form.Item>
              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" block shape="round">
                  Đăng Ký
                </Button>
              </Form.Item>
              <Space>
                <Typography.Text>Bạn đã có tài khoản?</Typography.Text>
                <Link to="/login">Đăng nhập ngay</Link>
              </Space>
            </Form>
          </Col>
        </Row>
        <Tooltip title="Trở lại trang chủ" placement="topRight">
          <Button className="form_close" type="text" size="large" shape="circle" icon={<BsXLg />}></Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Signup;
