import { Select } from "antd";
import React from "react";
import "./index.scss";
export const GlobalCustomSelect = (props) => {
  return (
    <div className="custom-select-container">
      <Select {...props} />
      <div id="custom-select-label" className="label">
        {props?.label}
      </div>
    </div>
  );
};
