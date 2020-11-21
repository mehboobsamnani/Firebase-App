import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
