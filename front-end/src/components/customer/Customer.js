import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Layout, Typography } from "antd";

import Header from "./Header";
import Footer from "./Footer";

const Customer = (props) => {
  let { pathname } = useLocation();

  const children = props.children;

  return (
    <Layout>
      <Header />
      <div className="main_body">{children}</div>
      <Footer />
    </Layout>
  );
};

export default Customer;
