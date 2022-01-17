import React from 'react'
import { Tag, Typography } from 'antd';
import { Table } from 'antd';
import { vietnameseSlug, filters, onFilter, sorterByWords, setTagColor } from "../../common/utils";
import "./shipper.css";
import LocalSearch from "../form/LocalSearch"
import { getDataCookies, setDataCookies } from "../../functions/cookie";
import axios from 'axios';
import moment from 'moment'
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";


function Pickup() {
  const [keyword, setKeyword] = React.useState("");
  const [keySelect, setKeySelect] = React.useState("code");
  const keys = ["code", "pickupAt", "customerCode"];
  const [orderPickup, setOrderPickup] = React.useState({});
  const [ordercurrent, setOrdercurrent] = React.useState(null)

  const user = getDataCookies("LOGGED_IN_USER");
  // console.log(user);
  const dateFormat = 'DD-MM-YYYY';

  React.useEffect(
    async function getData() {
      const response = await axios.get(`${process.env.REACT_APP_API}/shipper/pickups`,
        {
          headers: {
            Authorization: user.token,
          },
        }).then((response) => {
          setOrderPickup(response.data)
          setOrdercurrent(orderPickup[0])
          // console.log("orderPickup", orderPickup);
        }).catch(function (error) {
          console.log(error);
        });
    }

    , [orderPickup.length])

  // console.log("orderPickup 2", orderPickup);
  console.log("ordercurrent", ordercurrent)

  const onFinish = ({ keySelect, keySearch }) => {
    setKeySelect(keySelect);
    setKeyword(vietnameseSlug(keySearch));
  };

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'code',
      render: (text, record) => (
        <Typography >
          {text}
        </Typography>
      ),
    },
    {
      title: 'Mã khách hàng',
      dataIndex: 'createdBy',
    },
    {
      title: 'Tên khách hàng',
      // dataIndex: 'createdBy',
      dataIndex: ['sender', 'fullName'],
    },
    {
      title: 'Địa điểm lấy hàng',
      dataIndex: ['sender', 'addressInfo'],
      render: (text, record) => (
        <Typography>
          <p>{text.address}</p>
        </Typography>
      ),
      // dataIndex: ['body',['receiver',['addressInfo','address']]],
    },
    {
      title: 'Thời điểm lấy dự kiến',
      dataIndex: ['assignment', 'assignedAt'],
      // render: (text, record) => <Typography.Text>{text}
      // {console.log("text time ",text)}
      // </Typography.Text>,

      render: (text, record) => <Typography.Text>{moment(text).format(dateFormat)}</Typography.Text>,
      // render: (text, record) => <Typography.Text>{moment(text,'YYYY/MM/DD')}</Typography.Text>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (text, record) => <Tag color={setTagColor(text, text)}
      >{text}
      </Tag>,

      // render: (text) => <Tag color={'blue'}>{text}</Tag>,
    },
  ];
  const data = [
    {
      key: "1",
      codeOrder: "DH00001",
      codeCustomer: "KH0001",
      customerName: "Nguyễn Văn An",
      pickupAdd: "	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội",
      pickupAt: "	22-12-2021",
      status: "Chờ lấy hàng",
    },
    {
      key: '3',
      codeOrder: 'DH00001',
      codeCustomer: 'KH0001',
      customerName: 'Nguyễn Văn An',
      pickupAdd: '	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội',
      pickupAt: '	22-12-2021',
      status: 'Chờ lấy hàng',
    },
    {
      key: '4',
      codeOrder: 'DH00001',
      codeCustomer: 'KH0001',
      customerName: 'Nguyễn Văn An',
      pickupAdd: '	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội',
      pickupAt: '	22-12-2021',
      status: 'Chờ lấy hàng',
    },
    {
      key: '5',
      codeOrder: 'DH00001',
      codeCustomer: 'KH0001',
      customerName: 'Nguyễn Văn An',
      pickupAdd: '	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội',
      pickupAt: '	22-12-2021',
      status: 'Chờ lấy hàng',
    },
    {
      key: '6',
      codeOrder: 'DH00001',
      codeCustomer: 'KH0001',
      customerName: 'Nguyễn Văn An',
      pickupAdd: '	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội',
      pickupAt: '	22-12-2021',
      status: 'Chờ lấy hàng',
    },
    {
      key: '7',
      codeOrder: 'DH00001',
      codeCustomer: 'KH0001',
      customerName: 'Nguyễn Văn An',
      pickupAdd: '	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội',
      pickupAt: '	22-12-2021',
      status: 'Chờ lấy hàng',
    },
    {
      key: '8',
      codeOrder: 'DH00001',
      codeCustomer: 'KH0001',
      customerName: 'Nguyễn Văn An',
      pickupAdd: '	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội',
      pickupAt: '	22-12-2021',
      status: 'Chờ lấy hàng',
    },
    {
      key: '9',
      codeOrder: 'DH00001',
      codeCustomer: 'KH0001',
      customerName: 'Nguyễn Văn An',
      pickupAdd: '	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội',
      pickupAt: '	22-12-2021',
      status: 'Chờ lấy hàng',
    },
    {
      key: '10',
      codeOrder: 'DH00001',
      codeCustomer: 'KH0001',
      customerName: 'Nguyễn Văn An',
      pickupAdd: '	262 Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội',
      pickupAt: '	22-12-2021',
      status: 'Chờ lấy hàng',
    },
  ];

  return (
    <div className="shipper-wrap">
      <div className="order-detail-wrap">
        <div className="shipper-title">
          <p>Chi tiết đơn hàng</p>
        </div>
        <div className="shipper-detail">
          <div className="shipper-detail-list"
            style={{ minWidth: 600, marginLeft: 50 }}
          >
            <table>
              <tr>
                <th>Trạng thái </th>
                <th><Tag color={setTagColor(ordercurrent?.status, ordercurrent?.status)}>{ordercurrent?.status}</Tag></th>
              </tr>
              <tr>
                <th>Mã đơn:</th>
                <th>{ordercurrent?.code}</th>
              </tr>
              <tr>
                <td>Khách hàng:</td>
                <td>{ordercurrent?.body.receiver.fullName}</td>
              </tr>
              <tr>
                <td>Thời gian lấy dự kiến:</td>
                <td>{moment(ordercurrent?.assignment?.assignedAt).format(dateFormat)}</td>
              </tr>
              <tr>
                <td>Địa điểm lấy hàng:</td>
                <td>{ordercurrent?.sender.addressInfo.address}</td>
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
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  setOrdercurrent(record)
                  console.log("ordercurrent", ordercurrent)
                }, // click row
              };
            }}
            pagination={{
              total: orderPickup?.length,
              showTotal: (total) => (
                <p style={{ marginRight: 16 }}>
                  Total <b>{total}</b> items
                </p>
              ),
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30", "50"],
            }}
            columns={columns} dataSource={orderPickup.length ? orderPickup : []} />
        </div>
      </div>
    </div>
  );
}

export default Pickup;
