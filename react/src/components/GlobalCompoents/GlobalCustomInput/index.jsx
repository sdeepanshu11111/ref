import React from "react";
import "./index.scss"; // Import the CSS file
import { Input } from "antd";

const GlobalCustomInput = (props) => {
  return (
    <span className="input-container-custom">
      <Input
        type="text"
        className="custom-input"
        // placeholder="Customer Name"
        
        {...props}
      />
    </span>
  );
};

export default GlobalCustomInput;
