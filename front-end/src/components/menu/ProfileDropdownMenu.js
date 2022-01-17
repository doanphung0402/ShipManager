import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Typography, Avatar, Dropdown, Button, Menu, Space, Statistic } from "antd";

import { FaChevronDown, FaRegUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { RiHistoryFill, RiAdminLine } from "react-icons/ri";

import { getDataCookies, removeDataCookies } from "../../functions/cookie";
import { getCustomerInfo } from "../../functions/customer";

const ProfileDropdownMenu = () => {
  let history = useHistory();
  const [customerInfo, setCustomerInfo] = React.useState("");

  const user = getDataCookies("LOGGED_IN_USER");

  React.useEffect(() => {
    loadCustomerInfo();
  }, []);

  const loadCustomerInfo = () =>
    getCustomerInfo(user.token)
      .then((res) => setCustomerInfo(res.data))
      .catch((err) => console.log(err));

  const logout = () => {
    removeDataCookies("LOGGED_IN_USER");
    history.replace("/login");
  };

  const iconSize = 22;
  const dropdownItemStyle = { borderRadius: 8 };
  const dropdownTextStyle = { padding: 10, display: "flex", alignItems: "center", justifyContent: "space-between", fontWeight: "bold", gap: 16 };
  const menu = (
    <Menu style={{ borderRadius: 8, padding: 8 }}>
      {user.role === "admin" ? (
        <Menu.Item style={dropdownItemStyle} key="home">
          <Link to="/admin/home" style={dropdownTextStyle}>
            Quản trị <RiAdminLine size={iconSize} />
          </Link>
        </Menu.Item>
      ) : user.role === "coordinator" ? (
        <Menu.Item style={dropdownItemStyle} key="home">
          <Link to="/coordinator/home" style={dropdownTextStyle}>
            Điều phối viên <RiAdminLine size={iconSize} />
          </Link>
        </Menu.Item>
      ) : user.role === "accountant" ? (
        <Menu.Item style={dropdownItemStyle} key="home">
          <Link to="/accountant/home" style={dropdownTextStyle}>
            Kế toán <RiAdminLine size={iconSize} />
          </Link>
        </Menu.Item>
      ) : user.role === "shipper" ? (
        <Menu.Item style={dropdownItemStyle} key="home">
          <Link to="/shipper/home" style={dropdownTextStyle}>
            Nhân viên giao hàng <RiAdminLine size={iconSize} />
          </Link>
        </Menu.Item>
      ) : (
        <>
          <Menu.Item style={dropdownItemStyle} key="create-order">
            <Link to="/customer/create-order" style={dropdownTextStyle}>
              <Space direction="vertical" size={0}>
                <Typography.Text>Tài khoản</Typography.Text>
                <Statistic valueStyle={{ fontSize: 14, fontWeight: "normal", paddingLeft: 2 }} value={customerInfo.currentMoney} suffix="₫" />
              </Space>
              <FaRegUserCircle size={iconSize} />
            </Link>
          </Menu.Item>
          <Menu.Item style={dropdownItemStyle} key="orders">
            <Link to="/customer/orders" style={dropdownTextStyle}>
              Đơn hàng <RiHistoryFill size={iconSize} />
            </Link>
          </Menu.Item>
        </>
      )}
      <Menu.Item style={dropdownItemStyle} onClick={logout} key="logout">
        <span style={dropdownTextStyle}>
          <span style={{ fontWeight: "normal" }}>Logout</span> <FiLogOut size={iconSize} />
        </span>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomRight" arrow>
      <Space size="small" align="center" style={{ display: "flex" }}>
        <Button size="large" shape="circle" style={{ height: 45, width: 45, padding: 2 }}>
          <Avatar size="large" src={user.picture ?? "https://source.unsplash.com/random?vietnam,nature"} alt="avatar" />
        </Button>
        <Typography.Text type="secondary" style={{ width: 80, fontWeight: "bold" }} ellipsis>
          {user.fullName}
        </Typography.Text>
        <FaChevronDown className="dropdown-caret" />
      </Space>
    </Dropdown>
  );
};

export default ProfileDropdownMenu;
