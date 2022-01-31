import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
import "antd/dist/antd.css";
import App from "./App.js";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
