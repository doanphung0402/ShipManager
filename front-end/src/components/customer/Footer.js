import React from "react";
import { Link } from "react-router-dom";
import { Layout, Row, Space, Typography } from "antd";
import { FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa";

function Footer() {
  return (
    <Layout.Footer style={{ backgroundColor: "#1e2f47", padding: "32px 16px 32px" }}>
      <div className="container">
        <Row justify="space-between" style={{ borderBottom: "1px solid #7d8492", paddingBottom: 24, marginBottom: 24 }}>
          <div style={{ height: 50 }}>
            <Link to="#">
              <img height={50} src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg" alt="" />
            </Link>
          </div>
          <Space size={24} style={{ color: "#e6e6e6", fontWeight: "bold" }}>
            <span>Công ty công nghệ cổ phần Sapo</span>
            <Link to="#">
              <FaFacebookF />
            </Link>
            <Link to="#">
              <FaTwitter />
            </Link>
            <Link to="#">
              <FaGoogle />
            </Link>
          </Space>
        </Row>
      </div>
      <div className="container">
        <Row justify="space-between">
          <Space size={24} style={{ color: "#e6e6e6" }}>
            <Link to="#">Trang chủ</Link>
            <Link to="#">Giới thiệu</Link>
            <Link to="#">Về chúng tôi</Link>
            <Link to="#">Tiện ích</Link>
            <Link to="#">Bảng giá</Link>
          </Space>
          <Typography.Text style={{ color: "#e6e6e6" }}>
            © Bản quyền thuộc về <b> SAPO TECHNOLOGY JSC </b> Phát triển bởi <b>Mock Project team</b>
          </Typography.Text>
        </Row>
      </div>
    </Layout.Footer>
  );
}

export default Footer;
