import React from "react";
import { Link, useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import { Button, Form, Row, Col, Typography, Space, Tooltip, Divider, Input } from "antd";
import { FaFacebookSquare, FaPhoneAlt, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsXLg } from "react-icons/bs";
import "./style.css";

import { customerLogin } from "../../functions/auth";
import { getDataCookies, setDataCookies } from "../../functions/cookie";
import Loader from "../../components/loader/Loader";

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  let history = useHistory();

  const user = getDataCookies("LOGGED_IN_USER");

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

  React.useEffect(() => {
    form.setFieldsValue({ phoneNumber: window.localStorage.getItem("dataRegistration") });
  }, []);

  const roleBasedRedirect = (role) => {
    if (role === "admin") {
      history.push("/admin/employees");
    } else if (role === "shipper") {
      history.push("/shipper");
    } else if (role === "coordinator") {
      history.push("/coordinator/orders");
    } else if (role === "accountant") {
      history.push("/accountant/customers");
    } else {
      history.push("/customer/create-order");
    }
  };

  const onFinish = ({ phoneNumber, password }) => {
    setLoading(true);
    customerLogin(phoneNumber, password)
      .then((res) => {
        const data = {
          token: res.data.jwt,
          role: res.data.role,
          fullName: res.data.fullName,
        };
        setDataCookies("LOGGED_IN_USER", data);

        window.localStorage.removeItem("dataRegistration");
        roleBasedRedirect(res.data.role);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          <>
            Oops, đã có lỗi xảy ra <b>{phoneNumber}</b>!
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
                Đăng nhập
              </Typography.Link>
            </div>

            <Space>
              <Typography.Text>Đăng nhập nhanh bằng tài khoản </Typography.Text>
              <Button shape="circle" size="large" icon={<FcGoogle size={24} />}></Button>
              <Button shape="circle" size="large" icon={<FaFacebookSquare size={24} />}></Button>
            </Space>

            <Divider plain style={{ marginBottom: 16 }}>
              Hoặc đăng nhập với
            </Divider>

            <Form form={form} layout="vertical" size="large" requiredMark={false} onFinish={onFinish}>
              <Form.Item
                name="phoneNumber"
                rules={[
                  { required: true, message: "Bạn chưa nhập Số điện thoại!" },
                  { max: 12, message: "Số điện thoại không được quá 12 kí tự" },
                ]}
              >
                <Input prefix={<FaPhoneAlt />} type="tel" pattern="[0]{1}[0-9]{9}" placeholder="Nhập số điện thoại..." />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true, message: "Bạn chưa nhập mật khẩu!" }]}>
                <Input.Password prefix={<FaLock />} placeholder="Nhập mật khẩu..." />
              </Form.Item>
              <Form.Item>
                <Button loading={loading} type="primary" htmlType="submit" block shape="round">
                  Đăng nhập
                </Button>
              </Form.Item>
              <Space>
                <Typography.Text>Chưa có tài khoản?</Typography.Text>
                <Link to="/signup">Đăng ký ngay</Link>
              </Space>
              <Space>
                <Typography.Text>Hoặc</Typography.Text>
                <Link to="/login/employee">Chuyển đến trang dành cho nhân viên</Link>
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

export default Login;
