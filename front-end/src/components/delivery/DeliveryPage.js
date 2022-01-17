import React from "react";

import { vietnameseSlug } from "../../common/utils";
import DeliveryTable from "./DeliveryTable";
import LocalSearch from "../form/LocalSearch";

import { toast } from "react-toastify";
import { Card, Row, Col, Form, Select, Button, Space, Typography } from "antd";
import * as ServiceOrder from '../../functions/order'; 

// import { dataOrders } from "../../constant/initialValues";
import { useState } from "react";

const DeliveryPage = () => {
  const [dataOrders,setDataOrders] =useState([]); 
  const [form] = Form.useForm();
  const [keyword, setKeyword] = React.useState("");
  const [keySelect, setKeySelect] = React.useState("code");
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const keys = ["code", "customerCode", "pickupAreaDetail", "deliveryAreaDetail", "pickupBy", "deliveryBy"];
  const configSelect = {
    rules: [{ required: true, message: "Hãy chọn giá trị!" }],
  };

  const searched = (keyword) => (item) => vietnameseSlug(item[keySelect]).includes(keyword);

  const handleSearch = ({ keySelect, keySearch }) => {
    setKeySelect(keySelect);
    setKeyword(vietnameseSlug(keySearch));
  };
  const handleSubmit = ({ deliveryBy }) => {
    if (selectedRowKeys.length > 0) toast.success(`Thành công! ${selectedRowKeys.length} đơn hàng được thông báo đến ${deliveryBy}`);
    else toast.error("Thất bại! Chưa chọn đơn hàng");
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };
   React.useEffect(()=>{ 
    ServiceOrder.getAllOrderDelivery().then(data=>{
       const ListOrderDelivery = data.data.map((order,index)=>{
        return {
         id: index,
         code: order.code , 
         customerCode: order.createdBy ,
     
         pickupArea: order.sender.addressInfo.area, 
         pickupAreaDetail:order.sender.addressInfo.address, 
         pickupBy: null, 
         pickupAt: null,
         pickupStatus: order.status , 
     
         deliveryArea:order.body.receiver.addressInfo.area , 
         deliveryAreaDetail: order.body.receiver.addressInfo.address , 
         deliveryBy:null, 
         deliveryAt: null ,
         deliveryStatus:  order.status , 
     
         status:  order.status , 
         debtStatus:null ,
     
         orderName: null, 
         orderNote: null, 
         orderWeight: null, 
         orderSize: null, 
         orderCOD: null, 
         orderShipCost: null, 
         returnMoney: null, 
         orderDiscount: null, 
         needToPay:null, 
         orderTotal:null, 
     
         updatedAt: null, 
         createdAt: order.createdAt 
        }
   })
        console.log("🚀 ~ file: DeliveryPage.js ~ line 78 ~ ListOrderDelivery ~ ListOrderDelivery", ListOrderDelivery)
        setDataOrders(ListOrderDelivery);
    })
   },[])
  const renderForm = () => {
    return (
      <Form form={form} size="large" layout="inline" requiredMark={false} onFinish={handleSubmit}>
        <Form.Item colon={false} name="deliveryBy" label="Nhân viên giao hàng" {...configSelect}>
          <Select
            style={{ width: 320 }}
            placeholder="Chọn nhân viên giao hàng..."
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            {dataOrders.map((item) => (
              <Select.Option key={item.pickupBy} value={item.pickupBy}>
                {item.pickupBy}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Điều phối
            </Button>
            {selectedRowKeys.length > 0 ? (
              <span>
                <b>{selectedRowKeys.length}</b> đơn hàng
              </span>
            ) : (
              ""
            )}
          </Space>
        </Form.Item>
      </Form>
    );
  };

  return (
    <Row style={{ margin: "0 12px" }} gutter={[24, 24]}>
      <Col span={24}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Điều phối giao hàng
        </Typography.Title>
      </Col>
      <Col span={24}>
        <Card>{renderForm()}</Card>
      </Col>
      <Col span={24}>
        <Card title="Danh sách đơn hàng">
          <Row justify="start" style={{ marginBottom: 24 }}>
            <LocalSearch selectKeys={keys} onFinish={handleSearch} />
          </Row>
          <DeliveryTable
            data={dataOrders.filter(searched(keyword)).filter((item) => item.pickupStatus === "RECEIVED_AT_OFFICE_WAIT_FOR_DELIVER" || item.pickupStatus === "DELIVERING")}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={onSelectChange}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default DeliveryPage;
