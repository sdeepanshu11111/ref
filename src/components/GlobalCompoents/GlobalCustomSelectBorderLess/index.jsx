import { Select } from "antd";
import React from "react";
import "./index.scss";
export const GlobalCustomSelectBorderLess = (props) => {
  return (
    <div id="custom-select-borderless-container">
      <div className="label">{props?.label}</div>
      <Select {...props} />
    </div>
  );
};
