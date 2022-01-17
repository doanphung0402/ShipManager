import React from "react";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
import { Layout, Typography, Button } from "antd";
import { getDataCookies } from "../functions/cookie";

const Home = () => {
  const history = useHistory();
  const user = getDataCookies("LOGGED_IN_USER");

  const showToast = () => {
    toast.success("Thanh cong ");
  };

  return (
    <Layout.Content>
      <Typography.Title level={3}> Home</Typography.Title>
      <Button type="primary" onClick={showToast}>
        Click me
      </Button>
    </Layout.Content>
  );
};

export default Home;
