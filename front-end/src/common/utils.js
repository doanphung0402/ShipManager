import { areas } from "../constant/initialValues";
import moment from "moment";

export const formatFromNow = (date) => moment(date).fromNow();

export const formatDate = (date) => moment(date).format("DD/MM/YYYY");

export const filters = (filtersData) => [...filtersData.map((item) => ({ text: item ?? item.text, value: vietnameseSlug(item ?? item.text) }))];

export const onFilter = (filterKey) => {
  return (value, record) => vietnameseSlug(record[filterKey]).includes(value);
};

export const sorterByWords = (sorterKey) => (a, b) =>
  vietnameseSlug(a[sorterKey]) > vietnameseSlug(b[sorterKey]) ? 1 : vietnameseSlug(b[sorterKey]) > vietnameseSlug(a[sorterKey]) ? -1 : 0;

export const sorterByDate = (sorterKey) => (a, b) => moment(b[sorterKey]) - moment(a[sorterKey]);

export const setTagColor = (pickupStatus = "", deliveryStatus = "") => {
  if (pickupStatus === "READY_FOR_PICKUP") return "warning";
  if (pickupStatus === "PICKUP_FAIL" || deliveryStatus === "failed") return "error";
  if (pickupStatus === "PICKING" || deliveryStatus === "processing") return "processing";
  if (pickupStatus === "PICKUP_SUCCESS" || deliveryStatus === "success") return "success";
};

export const getArea = (value) => {
  const index = [...areas.map((item) => vietnameseSlug(item, "_").toUpperCase())].indexOf(value);
  return areas[index];
};

export function vietnameseSlug(str, separator = "-") {
  if (str) {
    str = str.trim();
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, "");
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");
    str = str.replace(/ +/g, "-");
    if (separator) {
      return str.replace(/-/g, separator);
    }
    return str;
  } else return "";
}
