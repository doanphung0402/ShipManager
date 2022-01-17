import React from "react";
import { Tag, Table, Statistic, Typography } from "antd";
import { vietnameseSlug, setTagColor } from "../../common/utils";
import "./shipper.css";
import LocalSearch from "../form/LocalSearch";
import axios from 'axios';
import moment from 'moment'
import { getDataCookies, setDataCookies } from "../../functions/cookie";


function Delivery() {
  const [keyword, setKeyword] = React.useState("");
  const [keySelect, setKeySelect] = React.useState("code");
  const keys = ["code", "pickupAt", "customerCode"];
  const [orderDelivery, setorderDelivery] = React.useState({});
  const [ordercurrent, setOrdercurrent] = React.useState(null)


  const user = getDataCookies("LOGGED_IN_USER");
  // console.log(user);
  const dateFormat = 'DD-MM-YYYY';

  React.useEffect(
    async function getData() {
      const response = await axios.get(`${process.env.REACT_APP_API}/shipper/delivers`,
        {
          headers: {
            Authorization: user.token,
          },
        }).then((response) => {
          setorderDelivery(response.data)
          console.log("orderDelivery", orderDelivery)
          setOrdercurrent(orderDelivery[0])
          // console.log("orderDelivery", orderDelivery);
        }).catch(function (error) {
          console.log(error);
        });
    }

    , [orderDelivery.length])


  const onFinish = ({ keySelect, keySearch }) => {
    setKeySelect(keySelect);
    setKeyword(vietnameseSlug(keySearch));
  };

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "code",
    },
    {
      title: "Mã khách hàng",
      dataIndex: "createdBy",
    },
    {
      title: "Tên khách hàng",
      dataIndex: ['sender', 'fullName'],
    },
    {
      title: "Địa điểm giao hàng",
      dataIndex: ['body', 'receiver'],
      render: (text, record) => <Typography.Text>
        <p>{text?.addressInfo?.address}</p>
      </Typography.Text>,

    },
    {
      title: "Người nhận",
      dataIndex: ['body', 'receiver'],
      render: (text, record) => <Typography.Text>
        <p>{text.fullName}</p>
      </Typography.Text>,
    },
    {
      title: "Thời điểm giao dự kiến",
      dataIndex: ['assignment', 'assignedAt'],
      render: (text, record) => <Typography.Text>{moment(text).format(dateFormat)}</Typography.Text>,
    },
    {
      title: "Phí COD",
      dataIndex: ['body', 'codMoney'],
    },
    {
      title: "Phí Ship",
      dataIndex: ['body', 'shipMoney'],
    },
    {
      title: "Tổng",
      dataIndex: "total",
      className: "total-money",
      render: (text, record) => <Statistic value={text} suffix="VNĐ" />,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text, record) => <Tag color={setTagColor(text, text)}
      >{text}
      </Tag>,
    },
  ];
  const data = [
    {
      key: "1",
      codeOrder: "DH00001",
      codeCustomer: "KH0001",
      customerName: "Nguyễn Văn An",
      deliveryAdd: "	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội",
      deliveryAt: "	22-12-2021",
      reveiver: "Nguyễn Văn Huy",
      status: "Đang giao",
      ship: "15,000",
      cod: "100,000",
      total: "115,000",
    },
    {
      key: "2",
      codeOrder: "DH00001",
      codeCustomer: "KH0001",
      customerName: "Nguyễn Văn An",
      deliveryAdd: "	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội",
      deliveryAt: "	22-12-2021",
      reveiver: "Nguyễn Văn Huy",
      status: "Đang giao",
      ship: "15,000",
      cod: "100,000",
      total: "115,000",
    },
    {
      key: "3",
      codeOrder: "DH00001",
      codeCustomer: "KH0001",
      customerName: "Nguyễn Văn An",
      deliveryAdd: "	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội",
      deliveryAt: "	22-12-2021",
      reveiver: "Nguyễn Văn Huy",
      status: "Đang giao",
      ship: "15,000",
      cod: "100,000",
      total: "115,000",
    },
    {
      key: "4",
      codeOrder: "DH00001",
      codeCustomer: "KH0001",
      customerName: "Nguyễn Văn An",
      deliveryAdd: "	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội",
      deliveryAt: "	22-12-2021",
      reveiver: "Nguyễn Văn Huy",
      status: "Đang giao",
      ship: "15,000",
      cod: "100,000",
      total: "115,000",
    },
  ];

  return (
    <div className="shipper-wrap">
      <div className="order-detail-wrap">
        <div className="shipper-title">
          <p>Chi tiết đơn hàng</p>
        </div>
        <div className="shipper-detail">
          <div className="shipper-detail-list">
            <table>
              <tr>
                <th>Trạng thái </th>
                <th>
                <Tag color={setTagColor(ordercurrent?.status, ordercurrent?.status)}>{ordercurrent?.status}</Tag>                
                </th>
              </tr>
              <tr>
                <th>Mã đơn:</th>
                <th>{ordercurrent?.code}</th>
              </tr>
              <tr>
                <td>Mã khách hàng:</td>
                <td>{ordercurrent?.createdBy}</td>
              </tr>
              <tr>
                <td>Khách hàng:</td>
                <td>{ordercurrent?.body.receiver.fullName}</td>
              </tr>
              <tr>
                <td>Thời gian giao dự kiến:</td>
                <td>{moment(ordercurrent?.assignment?.assignedAt).format(dateFormat)}</td>
              </tr>
              <tr>
                <td>Người nhận:</td>
                <td>Nguyễn Văn Huy</td>
              </tr>
              <tr>
                <td>Địa điểm giao hàng:</td>
                <td>{ordercurrent?.body.receiver.addressInfo.address}</td>
              </tr>
            </table>
          </div>
          <div className="shipper-detail-list">
            <table>
              <tr>
                <th style={{ display: 'flex' }}>Danh sách sản phẩm: </th>
                <th>
                  262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội
                  <br />
                  <br />
                  262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội
                  <br />
                  <br />
                  262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội
                </th>
              </tr>
              <tr>
                <td>Ghi chú: </td>
                <td>---------------</td>
              </tr>
              <tr>
                <td>Phí Ship: </td>
                <td className="money"> 15,000 </td>
              </tr>
              <tr>
                <td>COD: </td>
                <td className="money"> 100,000 </td>
              </tr>
              <tr>
                <td className="total-money">Tổng đơn hàng:</td>
                <td className="total-money"> 115,000 </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div className="list-order-wrap">
        <div className="order-detail-wrap">
          <div className="shipper-title">
            <p>Danh sách đơn hàng</p>
          </div>
          <div className="order-search">
            <LocalSearch selectKeys={keys} onFinish={onFinish} />
          </div>
          <Table
            pagination={{
              total: orderDelivery?.length,
              showTotal: (total) => (
                <p style={{ marginRight: 16 }}>
                  Total <b>{total}</b> items
                </p>
              ),
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "50"],
            }}
            columns={columns}
            dataSource={orderDelivery.length ? orderDelivery : []}
          />
        </div>
      </div>
    </div>
  );
}

export default Delivery;
