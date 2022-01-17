import axios from "axios";
import * as base64 from "base-64";

export const createCustomer = async (data, authtoken = "") => {
  const { phoneNumber, password, fullName, area } = data;
  const body = {
    fullName,
    email: "your_email@gmail.com",
    taxCode: phoneNumber,
    addressInfo: { area, address: "Hanoi" },
  };
  if (!authtoken) return await axios.post(`${process.env.REACT_APP_API}/customers`, { phoneNumber, password, body });
  return await axios.post(
    `${process.env.REACT_APP_API}/customers`,
    { phoneNumber, password, body },
    {
      headers: {
        Authorization: authtoken,
      },
    }
  );
};

export const customerLogin = async (phoneNumber, password) => {
  return await axios.get(`${process.env.REACT_APP_API}/login-for-customer`, {
    auth: {
      username: phoneNumber,
      password: password,
    },
  });
};

export const employeeLogin = async (username, password) => {
  return await axios.get(`${process.env.REACT_APP_API}/login-for-employee`, {
    auth: {
      username: username,
      password: password,
    },
  });
};
