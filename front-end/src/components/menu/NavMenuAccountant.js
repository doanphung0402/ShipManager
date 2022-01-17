import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { FaHome, FaClipboardList, FaRegAddressBook, FaTruck, FaCog } from "react-icons/fa";
const NavMenuAccountant = () => {
  let { pathname } = useLocation();
  return (
    <Menu theme="dark" mode="inline" style={{ height: "100vh" }} defaultSelectedKeys={[pathname.split("/")[2]]}>
      <Menu.Item key="home" icon={<FaHome />}>
        <Link to="/accountant/home">Trang chủ</Link>
      </Menu.Item>
      <Menu.Item key="customers" icon={<FaRegAddressBook />}>
        <Link to="/accountant/customers">Danh sách khách hàng</Link>
      </Menu.Item>
      <Menu.Item key="orders" icon={<FaClipboardList />}>
        <Link to="/accountant/orders">Danh sách đơn hàng</Link>
      </Menu.Item>
      <Menu.Item key="shippers" icon={<FaTruck />}>
        <Link to="/accountant/shippers">Danh sách nhân viên vận chuyển</Link>
      </Menu.Item>
      <Menu.Item key="setting" icon={<FaCog />}>
        <Link to="/accountant/setting">Cài đặt</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavMenuAccountant;
