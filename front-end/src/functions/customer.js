import axios from "axios";

export const getAllCustomers = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/customers`, {});
};

export const getCustomerByCode = async (customerCode, authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/customers/${customerCode}`, {
    headers: {
      Authorization: authtoken,
    },
  });
};

export const getAllCustomersWithCOD = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/customers-with-cod`, {});
};

export const lockCustomer = async (customerCode, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/customers/${customerCode}/locked`,
    {},
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
};

export const unlockCustomer = async (customerCode, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/customers/${customerCode}/normal`,
    {},
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
};

export const updateCustomerByCode = async (customerCode, data, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/customers/${customerCode}`,
    {},
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
};

export const depositCustomerByCode = async (customerCode, amount, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/customers/${customerCode}/deposit/${amount}`,
    {},
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
};

export const withdrawCustomerByCode = async (customerCode, amount, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/customers/${customerCode}/withdraw/${amount}`,
    {},
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
};

export const getAllOrdersCustomerInfo = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/customer/orders`, {
    headers: {
      Authorization: authtoken,
    },
  });
};
export const getCustomerInfo = async (authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/customer`, {
    headers: {
      Authorization: authtoken,
    },
  });
};
export const getCustomerInfoMoneyChangeLog = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/customer-with-money`, {});
};
export const updateCustomerInfo = async (data, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/customer`,
    {},
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
};
