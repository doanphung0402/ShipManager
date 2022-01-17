import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Layout, Menu, Row, Statistic, Space, Button, Affix } from "antd";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

import ProfileDropdownMenu from "../menu/ProfileDropdownMenu";

function Header() {
  let { pathname } = useLocation();
  const [affixed, setAffixed] = React.useState(false);

  const renderHeaderTop = () => (
    <Layout.Header style={{ height: "auto", padding: "0 16px" }}>
      <div className="container">
        <Row align="middle">
          <Space style={{ height: 40 }}>
            <Button ghost icon={<FaPhoneAlt />} size="small" style={{ border: 0, fontSize: 14 }}>
              _+0858363246
            </Button>
            <Button ghost icon={<FaEnvelope />} size="small" style={{ border: 0, fontSize: 14 }}>
              _infor@email.com
            </Button>
            <Button ghost icon={<FaMapMarkerAlt />} size="small" style={{ border: 0, fontSize: 14 }}>
              _Tầng 6 - Tòa nhà Ladeco - 266 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội
            </Button>
          </Space>
        </Row>
      </div>
    </Layout.Header>
  );

  const renderHeader = () => (
    <Layout.Header className={affixed && "boxshadow"} style={{ height: "auto", background: "#fff", padding: "0 16px" }}>
      <div className="container">
        <Row justify="space-between" align="middle" wrap={false}>
          <div style={{ paddingBottom: 5 }}>
            <Link to="#">
              <img src="https://www.sapo.vn/Themes/Portal/Default/StylesV2/images/logo/Sapo-logo.svg" alt="logo" height={58} />
            </Link>
          </div>
          <Space>
            <Menu mode="horizontal" theme="light" disabledOverflow selectedKeys={[pathname.split("/")[2]]}>
              <Menu.Item>
                <Link to="#">TRANG CHỦ</Link>
              </Menu.Item>
              <Menu.Item key="create-order">
                <Link to="/customer/create-order">TẠO ĐƠN</Link>
              </Menu.Item>
              <Menu.Item key="orders">
                <Link to="/customer/orders">ĐƠN HÀNG </Link>
              </Menu.Item>
            </Menu>
          </Space>
          <Space>
            <ProfileDropdownMenu />
          </Space>
        </Row>
      </div>
    </Layout.Header>
  );

  return (
    <>
      {renderHeaderTop()}
      <Affix offsetTop={affixed ?? 0.0001} onChange={(affixed) => setAffixed(affixed)}>
        {renderHeader()}
      </Affix>
    </>
  );
}

export default Header;
