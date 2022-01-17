export const user = {
  id: 0,
  name: "Coordinatorrr",
  role: "admin",
  // role: "coordinator",
  // role: "accountant",
  // role: "shipper",
  // role: "customer",
  picture: "https://source.unsplash.com/random?vietnam,nature",
};

export const status1 = [
  { id: "00", color: "warning", text: "Sẵn sàng để lấy" },
  { id: "01", color: "processing", text: "Đang lấy hàng" },
  { id: "02", color: "processing", text: "Đang ở kho" },
  { id: "03", color: "processing", text: "Đang giao" },
  { id: "04", color: "success", text: "Giao thành công" },
  { id: "05", color: "success", text: "Đã nộp tiền" },
  { id: "06", color: "error", text: "Giao thất bại" },
];
export const dataKeys = [
  { dataKey: "code", text: "Mã đơn hàng" },
  { dataKey: "customerCode", text: "Mã khách hàng" },
  { dataKey: "staffCode", text: "Mã nhân viên" },
  { dataKey: "pickupArea", text: "Khu vực lấy hàng" },
  { dataKey: "pickupAreaDetail", text: "Địa chỉ lấy hàng" },
  { dataKey: "pickupBy", text: "Nhân viên lấy hàng" },
  { dataKey: "pickupAt", text: "Thời gian lấy hàng" },
  { dataKey: "pickupStatus", text: "Trạng thái lấy hàng" },
  { dataKey: "deliveryArea", text: "Khu vực giao hàng" },
  { dataKey: "deliveryAreaDetail", text: "Địa chỉ giao hàng" },
  { dataKey: "deliveryBy", text: "Nhân viên giao hàng" },
  { dataKey: "deliveryAt", text: "Thời gian giao hàng" },
  { dataKey: "deliveryStatus", text: "Trạng thái giao hàng" },
  { dataKey: "status", text: "Trạng thái đơn hàng" },
  { dataKey: "orderName", text: "Tên đơn hàng" },
  { dataKey: "orderNote", text: "Ghi chú đơn hàng" },
  { dataKey: "orderWeight", text: "Khối lượng đơn hàng" },
  { dataKey: "orderSize", text: "Kích thước đơn hàng" },
  { dataKey: "orderCOD", text: "Phí COD" },
  { dataKey: "orderShipCost", text: "Phí vận chuyển" },
  { dataKey: "orderDiscount", text: "Chiết khấu" },
  { dataKey: "orderTotal", text: "Tổng" },
  { dataKey: "updatedAt", text: "Ngày cập nhật" },
  { dataKey: "createdAt", text: "Ngày tạo" },
  { dataKey: "fullName", text: "Họ và tên" },
  { dataKey: "phone", text: "Số điện thoại" },
  { dataKey: "email", text: "Email" },
  { dataKey: "cod", text: "Phí COD" },
  { dataKey: "deliveryMoney", text: "Phí vận chuyển" },
  { dataKey: "returnMoney", text: "Phí hoàn trả" },
  { dataKey: "all", text: "Tổng" },
];

export const status = ["Sẵn sàng để lấy", "Đang lấy hàng", "Đang ở kho", "Đang giao", "Giao thành công", "Đã nộp tiền", "Giao thất bại"];
export const areas = [
  "Hoàng Mai",
  "Long Biên",
  "Thanh Xuân",
  "Bắc Từ Liêm",
  "Ba Đình",
  "Cầu Giấy",
  "Đống Đa",
  "Hai Bà Trưng",
  "Hoàn Kiếm",
  "Tây Hồ",
  "Nam Từ Liêm",
  "Đan Phượng",
  "Gia Lâm",
  "Đông Anh",
  "Chương Mỹ",
  "Hoài Đức",
  "Ba Vì",
  "Mỹ Đức",
  "Phúc Thọ",
  "Thạch Thất",
  "Quốc Oai",
  "Thanh Trì",
  "Thường Tín",
  "Thanh Oai",
  "Phú Xuyên",
  "Mê Linh",
  "Sóc Sơn",
  "Ứng Hòa",
  "Sơn Tây",
];
const statusPickup = ["ready", "success", "processing", "failed"];
const statusDelivery = ["processing", "failed", "success"];
const orderSizes = ["30x20x30", "50x40x50", "90x60x90"];
const shipper = ["Nhân viên 1", "Nhân viên 2", "Nhân viên 3", "Nhân viên 4"];

export const dataOrders = [];
for (let i = 0; i < 50; i++) {
  dataOrders.push({
    id: i,
    code: `DH000${i}`,
    customerCode: `KH000${i}`,

    pickupArea: areas[i % 11],
    pickupAreaDetail: `26${i} Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội`,
    pickupBy: shipper[i % 4],
    pickupAt: `${i}:${i}`,
    pickupStatus: statusPickup[i % 4],

    deliveryArea: areas[i % 11],
    deliveryAreaDetail: `46${i} Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội`,
    deliveryBy: shipper[i % 4],
    deliveryAt: `${i}:${i}`,
    deliveryStatus: statusDelivery[i % 3],

    status: status[i % 7],
    debtStatus: i % 2 === 0 ? "success" : "failed",

    orderName: `${i}${i}${i}name`,
    orderNote: `${i}${i}${i}Lorem ipsum dolor sit ame consectetur adipiscing elit.`,
    orderWeight: `${i}`, //kg
    orderSize: orderSizes[i % 3], //30x30x30
    orderCOD: 500000 + i, //VND
    orderShipCost: 300000 + i, //VND
    returnMoney: 200000 + i, //VND
    orderDiscount: i % 99, //%
    needToPay: 200000 + i, //VND
    orderTotal: 1000000 + i * 2, //VND

    updatedAt: `${i}:${i}`,
    createdAt: `${i}:${i}`,
  });
}
export const dataCustomers = [];
for (let i = 0; i < 50; i++) {
  dataCustomers.push({
    id: i,
    customerCode: `KH000${i}`,
    staffCode: `---`,
    fullName: `Nguyen ${i} ${i}${i}`,
    birthDay: `01/${i}/1999`,
    phone: `0123${i}0123${i}`,
    email: `nguyen_${i}_${i}${i}@gmail.com`,
    address: `26${i} Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội`,
    customerType: `Bán buôn${i}`,
    taxNo: null,
    website: null,
    updatedAt: `${i}:${i}`,
    createdAt: `${i}:${i}`,
    role: "customer",
  });
}

const staffRoles = ["coordinator", "accountant", "shipper"];
export const dataStaffs = [];
for (let i = 0; i < 50; i++) {
  dataStaffs.push({
    id: i,
    customerCode: `KH000${i}`,
    staffCode: `NV000${i}`,
    fullName: `Nguyen ${i} ${i}${i}`,
    birthDay: `01/${i}/1999`,
    phone: `0123${i}0123${i}`,
    email: `nguyen_${i}_${i}${i}@gmail.com`,
    address: `26${i} Đội Cấn - Phường Liễu Giai - Quận Ba Đình - TP Hà Nội`,
    // customerType: `Bán buôn${i}`,
    taxNo: null,
    website: null,
    updatedAt: `${i}:${i}`,
    createdAt: `${i}:${i}`,
    role: `${staffRoles[i % 3]}`,
  });
}

export const dataSummaryCustomers = [];
for (let i = 0; i < 50; i++) {
  dataSummaryCustomers.push({
    id: i,
    customerCode: `KH000${i}`,
    fullName: `Nguyen ${i} ${i}${i}`,
    phone: `0123${i}0123${i}`,
    cod: 500000 + i,
    deliveryMoney: 300000 + i,
    returnMoney: 200000 + i,
    all: 1000000 + i * 3,
  });
}
export const dataDebtCustomers = [];
for (let i = 0; i < 50; i++) {
  dataDebtCustomers.push({
    id: i,
    orderCode: `DH000${i}`,
    updatedAt: `${i}:${i}`,
    createdAt: `${i}:${i}`,
    cod: 500000 + i,
    deliveryMoney: 300000 + i,
    returnMoney: 200000 + i,
    needToPay: 200000 + i,
    debtStatus: i % 2 === 0 ? "success" : "failed",
  });
}
