import React, { useEffect, useState } from "react";

import { vietnameseSlug } from "../../common/utils";
import AllOrdersTable from "./AllOrdersTable";
import LocalSearch from "../form/LocalSearch";

import { toast } from "react-toastify";
import { Card, Row, Form } from "antd";
import * as OrderService from '../../functions/order'
// import { dataOrders } from "../../constant/initialValues";

const AllOrdersPage = () => {
  const [form] = Form.useForm();
  const [keyword, setKeyword] = React.useState("");
  const [keySelect, setKeySelect] = React.useState("code");
  const keys = ["code", "customerCode", "pickupAreaDetail", "deliveryAreaDetail", "pickupBy", "deliveryBy"];
   
  const handleRemove = (id) => {
    toast.error(id);
  };

  const searched = (keyword) => (item) => vietnameseSlug(item[keySelect]).includes(keyword);

  const onFinish = ({ keySelect, keySearch }) => {
    setKeySelect(keySelect);
    setKeyword(vietnameseSlug(keySearch));
  };
  const [dataOrders,setDataOrder] = useState([]); 
  useEffect(()=>{
     const getAllOrder = async() =>{
        OrderService.getAllOrders().then(data=>{
          console.log("🚀 ~ file: AllOrdersPage.js ~ line 32 ~ OrderService.getAllOrders ~ data", data)
          setDataOrder(data.data); 
        }).catch(error=>{
           toast.error("Lỗi hệ thống , Vui lòng thử lại !"); 
        })
     }
      getAllOrder(); 
  },[])
  return (
    <Row style={{ margin: "0" }}>
      <Card title="Danh sách phiếu giao hàng">
        <Row justify="center" style={{ marginBottom: 24 }}>
          <LocalSearch selectKeys={keys} onFinish={onFinish} />
        </Row>
        <AllOrdersTable data={dataOrders.filter(searched(keyword))} handleRemove={handleRemove} />
      </Card>
    </Row>
  );
};

export default AllOrdersPage;
