import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "./store/store";
import App from "./App.jsx";
import "./index.scss";
import "./buttons.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: "#514DE2",
        borderRadius: 4,

        colorText: "#212121",
        motionDurationMid: "0.4s",
      },
    }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ConfigProvider>
);
