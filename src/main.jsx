import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Context from "./services/Context.jsx";
// import { BrowserRouter } from "react-router-dom/dist/index.";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import ToastContainer from "./utils/Toast.jsx";
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter } from "react-router-dom";
// import "primeflex/primeflex.css";
// import "primereact/resources/primereact.css";
// import "primereact/resources/themes/saga-blue/theme.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Context>
      <ToastContainer />
      <App />
    </Context>
  </BrowserRouter>
);

