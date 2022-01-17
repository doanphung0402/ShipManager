import React from "react";

import { Layout, Affix, Typography, Space, Avatar } from "antd";

import NavMenuCoordinator from "../menu/NavMenuCoordinator";
import NavMenuShipper from "../menu/NavMenuShipper";
import NavMenuAccountant from "../menu/NavMenuAccountant";
import NavMenuAdmin from "../menu/NavMenuAdmin";

const NavBar = ({ user }) => {
  const { role } = user;

  const [collapsed, setCollapsed] = React.useState(true);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const renderMenu = () => {
    if (role === "admin") return <NavMenuAdmin />;
    else if (role === "coordinator") return <NavMenuCoordinator />;
    else if (role === "accountant") return <NavMenuAccountant />;
    else if (role === "shipper") return <NavMenuShipper />;
  };

  const renderLogoSider = () => {
    return (
      <Space align="center" size={16} style={{ height: 64, width: "100%", padding: 16, marginBottom: 0 }}>
        <Avatar
          shape="square"
          size={44}
          src="https://gcalls.co/wp-content/uploads/sites/3/2019/07/gcalls-logo-%C4%91o%CC%82%CC%81i-ta%CC%81c-Sapo.png"
          alt="logo"
        />
        {!collapsed && (
          <Typography.Title type="success" level={2} style={{ marginBottom: 0 }}>
            Sapo
          </Typography.Title>
        )}
      </Space>
    );
  };

  return (
    <Affix offsetTop={0.001}>
      <Layout.Sider id="navbar" width={230} collapsible collapsed={collapsed} onCollapse={onCollapse} style={{ minHeight: "100vh", overflow: "auto" }}>
        {renderLogoSider()}
        {renderMenu()}
      </Layout.Sider>
    </Affix>
  );
};

export default NavBar;
