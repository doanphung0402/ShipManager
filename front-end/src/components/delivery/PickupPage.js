import React from "react";

import { vietnameseSlug } from "../../common/utils";
import PickupTable from "./PickupTable";
import LocalSearch from "../form/LocalSearch";

import { toast } from "react-toastify";
import { Card, Row, Col, Form, Select, Button, Space, Typography, AutoComplete } from "antd";
import * as OrderService from '../../functions/order'; 
import {   areas } from "../../constant/initialValues";

const PickupPage = () => {
  const [form] = Form.useForm();
  const [keyword, setKeyword] = React.useState("");
  const [keySelect, setKeySelect] = React.useState("code");
  const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
  const [selectArea, setSelectArea] = React.useState("");
  const [pickupData, setPickupData] = React.useState([]);
   
  const [dataOrders,setDataOrder] =React.useState([]); 

  React.useEffect(() => {
       
       OrderService.getAllOrderPickUp().then(data=>{
          console.log("🚀 ~ file: PickupPage.js ~ line 25 ~ OrderService.getAllOrderPickUp ~ data", data)
          const ListOrderData  = data.data.map((order,index)=>{
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
          setDataOrder(ListOrderData); 
          console.log("🚀 ~ file: PickupPage.js ~ line 62 ~ OrderService.getAllOrderPickUp ~ ListOrderData", ListOrderData)
          const newArray = ListOrderData.filter((order) => order.pickupArea.includes(selectArea));
          setPickupData(newArray);
       }) 

  }, [selectArea]);

  const keys = ["code", "customerCode", "pickupAreaDetail", "deliveryAreaDetail", "pickupBy", "deliveryBy"];
  const configSelect = {
    rules: [{ required: true, message: "Hãy chọn giá trị!" }],
  };

  // console.log("select area", selectArea);

  const searched = (keyword) => (item) => vietnameseSlug(item[keySelect]).includes(keyword);

  const handleSearch = ({ keySelect, keySearch }) => {
    setKeySelect(keySelect);
    console.log("keySelect", keySelect);
    setKeyword(vietnameseSlug(keySearch));
  };
  const handleSubmit = ({ pickupBy }) => {
    if (selectedRowKeys.length > 0) toast.success(`Thành công! ${selectedRowKeys.length} đơn hàng được thông báo đến ${pickupBy}`);
    else toast.error("Thất bại! Chưa chọn đơn hàng");
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys", selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const Complete = () => (
    <AutoComplete
      style={{
        width: 200,
      }}
      options={areas.map((value, key) => ({ value, key }))}
      placeholder="tất cả khu vực"
      onChange={setSelectArea}
      filterOption={(inputValue, option) => option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
    />
  );

  const renderForm = () => {
    return (
      <Form form={form} size="large" layout="inline" requiredMark={false} onFinish={handleSubmit}>
        <Form.Item colon={false} name="pickupBy" label="Chọn khu vực" style={{ marginRight: 80 }} {...configSelect}>
          {/* <Select
            style={{ width: 320 }}
            placeholder="Chọn khu vực "
            showSearch
            optionFilterProp="children"
            onChange={setSelectArea}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())}
          >
            {areas.map((val,key) => (
              <Select.Option key={val} value={val}>
                {val}
              </Select.Option>
            ))}
          </Select> */}
          <Complete />
        </Form.Item>

        <Form.Item colon={false} name="pickupBy" label="Nhân viên lấy hàng" {...configSelect}>
          <Select
            style={{ width: 320 }}
            placeholder="Chọn nhân viên lấy hàng..."
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
          Điều phối lấy hàng
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
          <PickupTable
            data={pickupData.filter(searched(keyword)).filter((item) => item.pickupStatus === "READY_FOR_PICKUP" || item.pickupStatus === "PICKING" ||item.pickupStatus==="PICKUP_FAIL"||item.pickupStatus === "PICKUP_SUCCESS"||
            item.pickupStatus === "PICKUP_FAIL_CANCELLED"||  item.pickupStatus === "PICKUP_FAIL_WAIT_FOR_PICKUP")}
            selectedRowKeys={selectedRowKeys}
            onSelectChange={onSelectChange}
            selectArea={selectArea}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default PickupPage;
