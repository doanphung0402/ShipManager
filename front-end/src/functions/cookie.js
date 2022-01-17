import Cookies from "universal-cookie";
const cookies = new Cookies();

export const getDataCookies = (key) => {
  return cookies.get(key);
};
export const setDataCookies = (key, data) => {
  return cookies.set(key, data, { path: "/" });
};
export const removeDataCookies = (key) => {
  return cookies.remove(key, { path: "/" });
};
