import axios from "axios";

export const getAllOrders = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/orders`, {});
};
export const getOrderByCode =async (code)=>{
  return await axios.get(`${process.env.REACT_APP_API}/orders/${code}`); 
}
export const findOrderWithStatus = async (orderCode) => {
  return await axios.get(`${process.env.REACT_APP_API}/orders_with_status/:${orderCode}`, {});
};
export const findOrderWithCode = async (orderCode) => {
  return await axios.get(`${process.env.REACT_APP_API}/orders/:${orderCode}`, {});
};
export const getAllOrderDelivery =async()=>{
    return await axios.get(`${process.env.REACT_APP_API}/candidates/for-deliver`,{}); 
}
export const getAllOrderReturn = async ()=>{
   return await axios.get(`${process.env.REACT_APP_API}/candidates/for-return`,{})
}
export const getOrderShipCost = async (origin, destination, weight) => {
  return await axios.post(`${process.env.REACT_APP_API}/ship-money`, { origin, destination, weight });
};
export const getAllOrderPickUp = async ()=>{
   return await axios.get(`${process.env.REACT_APP_API}/candidates/for-pickup`,{}); 
}
export const createOrderByCustomer = async (data, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/orders`,
    {
      productsList: data.orderProducts,
      note: data.orderNote,
      shipMoney: data.orderShipCost,
      codMoney: data.orderCOD,
      weight: data.orderWeight,
      receiver: {
        fullName: data.receiverName,
        phoneNumber: data.receiverPhone,
        addressInfo: {
          area: data.receiverArea,
          address: data.receiverAddress,
        },
      },
    },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
};

export const createOrderByEmployee = async (customerCode, data, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/customers/:${customerCode}/orders`,
    {},
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
};

export const updateOrderStatus = async (orderCode, data, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/orders/:${orderCode}/status`,
    {},
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
};
