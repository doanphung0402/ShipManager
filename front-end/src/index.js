import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Routers } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// store
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Routers>
    <Provider store={store}>
      <CookiesProvider>
        <App />
        <ToastContainer />
      </CookiesProvider>
    </Provider>
  </Routers>,
  document.getElementById("root")
);
