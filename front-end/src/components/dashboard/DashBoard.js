import React from "react";

import { Layout, Typography } from "antd";
import NavBar from "./NavBar";
import Header from "./Header";
import Footer from "./Footer";
import { getDataCookies } from "../../functions/cookie";

const DashBoard = (props) => {
  const user = getDataCookies("LOGGED_IN_USER");
  const children = props.children;
  return (
    <Layout>
      <NavBar user={user} />
      <Layout>
        <Header user={user} />
        {children}
      </Layout>
    </Layout>
  );
};

export default DashBoard;
