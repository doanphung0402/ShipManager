import Home from "../components/Home";
import DashBoard from "../components/dashboard/DashBoard";
import Login from "../page/auth/Login";
import Signup from "../page/auth/Signup";
import EmployeeLogin from "../page/auth/EmployeeLogin";

import CoordinatorHome from "../components/delivery/CoordinatorHome";
import CreateOrderPage from "../components/delivery/CreateOrderPage";
import PickupPage from "../components/delivery/PickupPage";
import DeliveryPage from "../components/delivery/DeliveryPage";
import ReturnedPage from "../components/delivery/ReturnedPage";
import AllOrdersPage from "../components/delivery/AllOrdersPage";

import AccountantHome from "../components/accountant/AccountantHome";
import AllCustomersPage from "../components/accountant/AllCustomersPage";
import CustomerDetailPage from "../components/accountant/CustomerDetailPage";

import Customer from "../components/customer/Customer";
import CCreateOrderPage from "../components/customer/CCreateOrderPage";
import ListOrderPage from "../components/customer/ListOrderPage";

import ShipperHome from "../components/shipper/ShipperHome";
import Pickup from "../components/shipper/Pickup";
import Delivery from "../components/shipper/Delivery";

import AdminHome from "../components/admin/AdminHome";
import AllStaffsPage from "../components/admin/AllStaffsPage";

export const Router = [
  {
    name: "",
    path: "/",
    exact: true,
    parentComponent: DashBoard,
    component: Home,
  },
  // KH khách hàng tạo order
  {
    name: "customer create order",
    path: "/customer/create-order",
    exact: true,
    parentComponent: Customer,
    component: CCreateOrderPage,
  },
  //KH khách hàng xem danh sách order
  {
    name: "customer orders",
    path: "/customer/orders",
    exact: true,
    parentComponent: Customer,
    component: ListOrderPage,
  },
  // Điều phối trang chủ
  {
    name: "coordinator home",
    path: "/coordinator/home",
    exact: true,
    parentComponent: DashBoard,
    component: CoordinatorHome,
  },
  // Điều phối tạo order
  {
    name: "order",
    path: "/coordinator/create-order",
    exact: true,
    parentComponent: DashBoard,
    component: CreateOrderPage,
  },
  // Điều phối xem danh sách order
  {
    name: "coordinator orders",
    path: "/coordinator/orders",
    exact: true,
    parentComponent: DashBoard,
    component: AllOrdersPage,
  },
  // Điều phối nhân viên lấy hàng
  {
    name: "coordinator pick",
    path: "/coordinator/pick",
    exact: true,
    parentComponent: DashBoard,
    component: PickupPage,
  },
  // Điều phối nhân viên giao hàng
  {
    name: "coordinator ship",
    path: "/coordinator/ship",
    exact: true,
    parentComponent: DashBoard,
    component: DeliveryPage,
  },
  // Điều phối nhân viên trả hàng
  {
    name: "coordinator return",
    path: "/coordinator/return",
    exact: true,
    parentComponent: DashBoard,
    component: ReturnedPage,
  },
  //Kế toán trang chủ
  {
    name: "accountant home",
    path: "/accountant/home",
    exact: true,
    parentComponent: DashBoard,
    component: AccountantHome,
  },
  //Kế toán danh sách khách hàng
  {
    name: "accountant customers",
    path: "/accountant/customers",
    exact: true,
    parentComponent: DashBoard,
    component: AllCustomersPage,
  },
  //Kế toán  chi tiết khách hàng
  {
    name: "accountant customer",
    path: "/accountant/customers/:code",
    exact: true,
    parentComponent: DashBoard,
    component: CustomerDetailPage,
  },
  //  SHIPPER trang chủ
  {
    name: "",
    path: "/shipper/home",
    exact: true,
    parentComponent: DashBoard,
    component: ShipperHome,
  },
  //  SHIPPER danh sách đơn giao
  {
    name: "shipper delivery",
    path: "/shipper/delivery",
    exact: true,
    parentComponent: DashBoard,
    component: Delivery,
  },
  // SHIPPER danh sách đơn lấy
  {
    name: "shipper pickup",
    path: "/shipper/pickup",
    exact: true,
    component: Pickup,
    parentComponent: DashBoard,
  },
  // ADMIN
  {
    name: "admin home",
    path: "/admin/home",
    exact: true,
    parentComponent: DashBoard,
    component: AdminHome,
  },
  {
    name: "admin employee",
    path: "/admin/employees",
    exact: true,
    parentComponent: DashBoard,
    component: AllStaffsPage,
  },
];
export const Router1 = [
  {
    name: "login",
    path: "/login",
    exact: true,
    component: Login,
  },
  {
    name: "signup",
    path: "/signup",
    exact: true,
    component: Signup,
  },
  {
    name: "employee login",
    path: "/login/employee",
    exact: true,
    component: EmployeeLogin,
  },
];
