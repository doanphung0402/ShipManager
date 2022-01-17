import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Layout, Breadcrumb, Row, Col, Badge, Avatar, Space, Divider } from "antd";

import { FaBell } from "react-icons/fa";
import ProfileDropdownMenu from "../menu/ProfileDropdownMenu";

const Header = ({ user }) => {
  let { pathname } = useLocation();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const renderBreadcrumb = () => {
    return (
      <Breadcrumb separator="/">
        {pathname.split("/").map((item) => (
          <Breadcrumb.Item key={item}>{capitalizeFirstLetter(item)}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  };

  const renderMenuRight = () => {
    return (
      <Row align="middle" wrap={false} justify="end">
        <Space size={8} split={<Divider type="vertical" />}>
          <Row align="middle" wrap={false} justify="end">
            {user && <ProfileDropdownMenu />}
          </Row>
          <Badge count={0} size="small" showZero offset={[-10, 5]}>
            <Avatar shape="square" size="large" style={{ color: "rgba(0, 0, 0, 0.35)", backgroundColor: "#fff" }} icon={<FaBell />} />
          </Badge>
        </Space>
      </Row>
    );
  };

  return (
    <Layout.Header style={{ padding: "0 24px", marginBottom: 24, height: "auto", backgroundColor: "#fff" }}>
      <Row align="middle" justify="space-between">
        <Col span={6}>{renderBreadcrumb()}</Col>
        <Col span={6}>{renderMenuRight()}</Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
