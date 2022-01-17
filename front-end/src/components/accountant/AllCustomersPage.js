import React from "react";

import { vietnameseSlug } from "../../common/utils";
import AllCustomersTable from "./AllCustomersTable";
import LocalSearch from "../form/LocalSearch";

import { toast } from "react-toastify";
import { Card, Row, Form, Col } from "antd";

import { getAllOrders } from "../../functions/order";
import { getAllCustomersWithCOD } from "../../functions/customer";

import { dataSummaryCustomers, dataCustomers } from "../../constant/initialValues";

const AllCustomersPage = () => {
  const [dataCustomers, setDataCustomers] = React.useState([]);
  const [keyword, setKeyword] = React.useState("");
  const [keySelect, setKeySelect] = React.useState("customerCode");
  const keys = ["customerCode", "fullName", "phone"];

  React.useEffect(() => {
    loadAllCustomers();
  }, []);

  const loadAllCustomers = () =>
    getAllCustomersWithCOD()
      .then((res) => setDataCustomers(res.data))
      .catch((err) => console.log(err));

  const handleRemove = (id) => {
    toast.error(id);
  };

  const searched = (keyword) => (item) => vietnameseSlug(item[keySelect]).includes(keyword);

  const onFinish = ({ keySelect, keySearch }) => {
    setKeySelect(keySelect);
    setKeyword(vietnameseSlug(keySearch));
  };

  return (
    <Row style={{ margin: "0" }}>
      <Col span={24}>
        <Card title="Danh sách khách hàng">
          <Row justify="center" style={{ marginBottom: 24 }}>
            <LocalSearch selectKeys={keys} onFinish={onFinish} />
          </Row>
          <AllCustomersTable data={dataCustomers.filter(searched(keyword))} handleRemove={handleRemove} />
        </Card>
      </Col>
    </Row>
  );
};

export default AllCustomersPage;
