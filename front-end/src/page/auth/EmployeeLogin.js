import React from "react";
import { Link, useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import { Button, Form, Row, Col, Typography, Space, Tooltip, Input } from "antd";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { BsXLg } from "react-icons/bs";
import "./style.css";

import { employeeLogin } from "../../functions/auth";
import { getDataCookies, setDataCookies } from "../../functions/cookie";
import Loader from "../../components/loader/Loader";

const EmployeeLogin = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  let history = useHistory();

  const user = getDataCookies("LOGGED_IN_USER");

  React.useEffect(() => {
    if (user && user.token) history.push("/");
  }, [history, user]);

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

  const onFinish = ({ username, password }) => {
    setLoading(true);
    employeeLogin(username, password)
      .then((res) => {
        const data = {
          token: res.data.jwt,
          role: res.data.role,
          fullName: res.data.fullName,
        };
        setDataCookies("LOGGED_IN_USER", data);

        roleBasedRedirect(res.data.role);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(
          <>
            Oops, đã có lỗi xảy ra <b>{username}</b>!
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

            <div style={{ borderBottom: "3px solid #4087eb", marginBottom: 32 }}>
              <Typography.Link strong style={{ fontSize: 32 }}>
                Đăng nhập
              </Typography.Link>
              <Typography.Text> - Nhân viên</Typography.Text>
            </div>

            <Form form={form} layout="vertical" size="large" requiredMark={false} onFinish={onFinish}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Bạn chưa nhập tên đăng nhập!" },
                  { max: 8, message: "Tên đăng nhập không được quá 8 kí tự" },
                ]}
              >
                <Input prefix={<FaUserAlt />} placeholder="Nhập tên đăng nhập..." />
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
                <Typography.Text>Hoặc</Typography.Text>
                <Link to="/login">Chuyển đến trang dành cho khách hàng</Link>
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

export default EmployeeLogin;
