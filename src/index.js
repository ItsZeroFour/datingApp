import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./scss/style.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/datingApp">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
