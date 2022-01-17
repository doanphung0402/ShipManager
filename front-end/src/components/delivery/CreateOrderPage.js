import React, { useEffect, useState } from "react";
import { removeAccents } from "../../functions/help";
import { toast } from "react-toastify";
import { Button, Form, Row, Col, Card, Typography, Space, Divider, Input, Select, InputNumber } from "antd";
import { areas } from "../../constant/initialValues";
import * as CustomerService from '../../functions/customer'
import * as OrderService from "../../functions/order"
const CreateOrderPage = () => {
  const [form] = Form.useForm();
 
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
    labelAlign: "left",
  };
  const rowFormStyle = {
    flexDirection: "row",
  };
  const configInput = {
    rules: [{ required: true, message: "Trường này chưa nhập giá trị!" }],
  };
  const configSelect = {
    rules: [{ required: true, message: "Hãy chọn giá trị!" }],
  };

  const onFinish = (values) => {
    console.log("🚀 ~ file: CreateOrderPage.js ~ line 24 ~ onFinish ~ values", values)
    toast.success("Created Successfully!");
    console.log("Received values of form: ", values);
  };
  const renderAreaOrder =(areas)=>{
     return areas.map((area,index)=>{
        return (
          <Select.Option key={index} value={area}>{area}</Select.Option>
        )
     })
  }
   const [codeCustomer,setCodeCustomer] =React.useState([]); 
 

   useEffect(()=>{  
      CustomerService.getAllCustomers().then(data=>{
        const ListCodeCustomer = data.data.map(customer=>{
            return customer.code 
        })
        setCodeCustomer(ListCodeCustomer); 
      
      })
   },[]); 
   
   const renderCodeCustomer = (codeCustomer)=>{
      return codeCustomer.map((code,index)=>{
           return (
            <Select.Option key={index} value={code}>{code}</Select.Option>
           )
      })
   }
   
   const [origin,setOrigin] = React.useState();
   const [destination,setDestination] = React.useState() ; 
   const [weight,setWeight] =React.useState(0); 
   const [shipMoney,setShipMoney] = React.useState(1); 
   const handleChangePickup =(event)=>{
    const rs = removeAccents(event)
    let rs2= rs.replace(/ /g,"_"); 
    setOrigin(rs2.toUpperCase()); 
   }
   const handleChangeDelivery = (event)=>{ 
    const rs = removeAccents(event)
    let rs2= rs.replace(/ /g,"_"); 
    setDestination(rs2.toUpperCase()); 
   }
   const handleWeight =(event)=>{
      setWeight(event.target.value); 
   }
   useEffect(()=>{
    if(origin!==null && destination!==null && weight!==null){
    console.log("🚀 ~ file: CreateOrderPage.js ~ line 74 ~ useEffect ~ weight", weight)
    console.log("🚀 ~ file: CreateOrderPage.js ~ line 74 ~ useEffect ~ destination", destination)
    console.log("🚀 ~ file: CreateOrderPage.js ~ line 74 ~ useEffect ~ origin", origin)
      
    OrderService.getOrderShipCost(origin,destination,weight).then(data=>{
      console.log("🚀 ~ file: CreateOrderPage.js ~ line 80 ~ OrderService.getOrderShipCost ~ data", data)
      // setShipMoney(data.data.shipMoney); 
      form.setFieldsValue({
        orderShipCost : data.data.shipMoney 
      })
    })
    }
 },[weight,origin,destination,shipMoney]); 
  const renderPickupForm = () => {
    return (
      <Card title="Thông tin lấy hàng" bordered={false}>
        <Form.Item name="pickupArea" {...layout} style={rowFormStyle} label="Quận/Khu vực" {...configSelect}>
          <Select placeholder="Chọn khu vực..." onChange={handleChangePickup}>
             {renderAreaOrder(areas)}
          </Select>
        </Form.Item>
        <Form.Item name="customerCode" {...layout} style={rowFormStyle} label="Khách hàng" {...configSelect}>
          <Select placeholder="Chọn mã khách hàng...">
             {renderCodeCustomer(codeCustomer)}
          </Select>
        </Form.Item>
        <Form.Item name="customerNumber" {...layout} style={rowFormStyle} label="Số điện thoại" {...configInput}>
          <InputNumber min={1} style={{ width: "100%" }} placeholder="Nhập số điện thoại..." />
        </Form.Item>
        <Form.Item name="pickupAreaDetail" {...layout} style={rowFormStyle} label="Địa chỉ" {...configInput}>
          <Input.TextArea showCount maxLength={300} placeholder="Nhập địa chỉ..." />
        </Form.Item>
      </Card>
    );
  };

  const renderShipForm = () => {
    return (
      <Card title="Thông tin giao hàng" bordered={false}>
        <Form.Item name="deliveryArea" {...layout} style={rowFormStyle} label="Quận/Khu vực" {...configSelect}>
          <Select placeholder="Chọn khu vực..." onChange={handleChangeDelivery}>
             {renderAreaOrder(areas)}
          </Select>
        </Form.Item>
        <Form.Item name="receiverName" {...layout} style={rowFormStyle} label="Người nhận" {...configInput}>
          <Input placeholder="Nhập tên người nhận..." />
        </Form.Item>
        <Form.Item name="receiverNumber" {...layout} style={rowFormStyle} label="Số điện thoại" {...configInput}>
          <InputNumber min={1} style={{ width: "100%" }} placeholder="Nhập số điện thoại..." />
        </Form.Item>
        <Form.Item name="deliveryAreaDetail" {...layout} style={rowFormStyle} label="Địa chỉ" {...configInput}>
          <Input.TextArea showCount maxLength={300} placeholder="Nhập địa chỉ..." />
        </Form.Item>
      </Card>
    );
  };

  const renderOrderDetailForm = () => {
    return (
      <Card title="Chi tiết đơn hàng" bordered={false}>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item name="orderName" label="Tên sản phẩm" {...configInput}>
              <Input.TextArea placeholder="Nhập tên sản phẩm..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="orderNote" label="Ghi chú">
              <Input.TextArea showCount maxLength={300} placeholder="Nhập ghi chú..." />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[24, 24]}>
          <Col span={12}>
            <Form.Item name="orderWeight" label="Khối lượng" {...configInput} onChange={handleWeight}>
              <InputNumber min={0} style={{ width: "100%" }} addonAfter="kg" step={0.5} placeholder="Nhập khối lượng sản phẩm..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="orderSize" label="Kích thước gói hàng" {...configSelect}>
              <Select placeholder="Chọn kích thước...">
                <Select.Option value="small">30x20x30</Select.Option>
                <Select.Option value="medium">50x40x50</Select.Option>
                <Select.Option value="large">90x60x90</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Divider orientation="left" plain>
          Chi phí
        </Divider>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <Form.Item name="orderCOD" label="COD" {...configInput}>
              <InputNumber min={1} style={{ width: "100%" }} addonAfter="VNĐ" step={1000} placeholder="Nhập phí COD..." />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="orderShipCost" label="Phí vận chuyển" {...configInput} >
              <InputNumber  min={1} style={{ width: "100%" }} addonAfter="VNĐ" step={1000} placeholder="Nhập phí vận chuyển..." />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="orderDiscount" initialValue={0} label="Chiết khấu dịch vụ">
              <InputNumber min={0} max={100} style={{ width: "100%" }} addonAfter="%" step={0.5} placeholder="Nhập chiết khấu..." />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="orderTotal" label="Tổng hóa đơn">
          <InputNumber disabled min={1} style={{ width: "100%" }} addonAfter="VNĐ" step={1000} placeholder="Tổng hóa đơn..." />
        </Form.Item>
      </Card>
    );
  };

  return (
    <Form form={form} layout="vertical" size="large" requiredMark={true} onFinish={onFinish} style={{ padding: "0 24px" }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            Tạo đơn hàng
          </Typography.Title>
        </Col>
        <Col span={12}>{renderPickupForm()}</Col>
        <Col span={12}>{renderShipForm()}</Col>
        <Col span={24}>{renderOrderDetailForm()}</Col>
        <Col span={24} style={{ display: "flex" }}>
          <Form.Item style={{ marginLeft: "auto" }}>
            <Space size={24}>
              <Button onClick={() => form.resetFields()}>Hủy</Button>
              <Button type="primary" htmlType="submit" onClick={()=>onFinish}>
                Tạo đơn hàng
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateOrderPage;
