import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.less";

import { Router1, Router } from "./constant/Router";
import { ProtectedRoute } from "./config/ProtectedRoute";
const renderRouterPageWithoutDB = (Router1) => {
  let xml = null;
  xml = Router1.map((route, index) => {
    const Component = route.component;
    return (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        render={() => {
          return <Component />;
        }}
      />
    );
  });
  return xml;
};
const renderRouterPageWithDB = (Router) => {
  let xml = null;
  xml = Router.map((route, index) => {
    return <ProtectedRoute key={index} path={route.path} exact={route.exact} component={route.component} parentComponent={route.parentComponent} />;
  });
  return xml;
};

function App() {
  return (
    <div className="App">
      <Switch>
        {renderRouterPageWithDB(Router)}
        {renderRouterPageWithoutDB(Router1)}
      </Switch>
    </div>
  );
}

export default App;
