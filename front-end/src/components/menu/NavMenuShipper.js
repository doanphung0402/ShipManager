import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";
import { FaHome, FaSyncAlt, FaUserAlt, FaCartPlus, FaShoppingCart } from "react-icons/fa";
const NavMenuShipper = () => {
  let { pathname } = useLocation();
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname.split("/")[1]]}>
      <Menu.Item key="home" icon={<FaHome />}>
        <Link to="/shipper/home">Trang chủ</Link>
      </Menu.Item>
      <Menu.Item key="pickup" icon={<FaCartPlus />}>
        <Link to="/shipper/pickup">Yêu cầu lấy hàng</Link>
      </Menu.Item>
      <Menu.Item key="delivery" icon={<FaShoppingCart />}>
        <Link to="/shipper/delivery">Yêu cầu giao hàng</Link>
      </Menu.Item>
      <Menu.Item key="update" icon={<FaSyncAlt />}>
        <Link to="/shipper/update">Cập nhật đơn hàng</Link>
      </Menu.Item>
      <Menu.Item key="profile" icon={<FaUserAlt />}>
        <Link to="/shipper/profile">Thông tin cá nhân </Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavMenuShipper;
