import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { FaHome, FaPlus, FaClipboardList, FaSearch, FaTruck, FaCog } from "react-icons/fa";
const NavMenuCoordinator = () => {
  let { pathname } = useLocation();
  return (
    <Menu theme="dark" mode="inline" style={{ height: "100vh" }} defaultSelectedKeys={[pathname.split("/")[2]]}>
      <Menu.Item key="home" icon={<FaHome />}>
        <Link to="/coordinator/home">Trang chủ</Link>
      </Menu.Item>
      <Menu.Item key="order" icon={<FaPlus />}>
        <Link to="/coordinator/create-order">Tạo đơn hàng</Link>
      </Menu.Item>
      <Menu.Item key="orders" icon={<FaClipboardList />}>
        <Link to="/coordinator/orders">Danh sách đơn hàng</Link>
      </Menu.Item>
      <Menu.SubMenu key="coordinator" icon={<FaTruck />} title="Điều phối nhân viên">
        <Menu.Item key="pick">
          <Link to="/coordinator/pick">Lấy hàng</Link>
        </Menu.Item>
        <Menu.Item key="ship">
          <Link to="/coordinator/ship">Giao hàng</Link>
        </Menu.Item>
        <Menu.Item key="return">
          <Link to="/coordinator/return">Trả hàng</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="setting" icon={<FaCog />}>
        <Link to="/coordinator/setting">Cài đặt</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavMenuCoordinator;
