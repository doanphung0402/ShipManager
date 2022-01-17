import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { FaHome, FaPlus, FaClipboardList, FaSearch, FaTruck, FaCog, FaSyncAlt, FaUserAlt, FaCartPlus, FaShoppingCart } from "react-icons/fa";
const NavMenuAdmin = () => {
  let { pathname } = useLocation();
  return (
    <Menu theme="dark" mode="inline" style={{ height: "100vh" }} defaultSelectedKeys={[pathname.split("/")[2]]}>
      <Menu.Item key="home" icon={<FaHome />}>
        <Link to="/admin/home">Trang chủ</Link>
      </Menu.Item>

      <Menu.Item key="order4" icon={<FaPlus />}>
        <Link to="/admin/employees">Thống kê</Link>
      </Menu.Item>
      <Menu.Item key="order5" icon={<FaPlus />}>
        <Link to="/admin/employees">Danh sách khách hàng</Link>
      </Menu.Item>
      <Menu.Item key="order1" icon={<FaPlus />}>
        <Link to="/admin/employees">Nhân viên điều phối</Link>
      </Menu.Item>
      <Menu.Item key="order2" icon={<FaPlus />}>
        <Link to="/admin/employees">Nhân viên kế toán</Link>
      </Menu.Item>
      <Menu.Item key="order3" icon={<FaPlus />}>
        <Link to="/admin/employees">Nhân viên vận chuyển</Link>
      </Menu.Item>

      <Menu.Item key="setting" icon={<FaCog />}>
        <Link to="/admin/setting">Cài đặt</Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavMenuAdmin;
