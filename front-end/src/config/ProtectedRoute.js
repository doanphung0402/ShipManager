import React from "react";
import { Route, useLocation } from "react-router-dom";
import { getDataCookies } from "../functions/cookie";
import LoadingToRedirect from "./LoadingToRedirect";
export const ProtectedRoute = ({ component: Component, parentComponent: ParentComponent, ...rest }) => {
  const user = getDataCookies("LOGGED_IN_USER");
  let { pathname } = useLocation();

  const roleBasedRedirect = () => {
    let routePath = pathname.split("/")[1];
    if (user.role === "admin") return true;
    else if (user.role === routePath) return true;
    else return false;
  };

  React.useEffect(() => {});
  return (
    <Route
      {...rest}
      render={() => {
        if (user && user.token) {
          return (
            <ParentComponent>
              {roleBasedRedirect() ? <Component /> : <LoadingToRedirect path={user.role !== "customer" ? `/${user.role}/home` : "/customer/create-order"} />}
            </ParentComponent>
          );
        } else {
          return <LoadingToRedirect path={"/login"} />;
        }
      }}
    />
  );
};
