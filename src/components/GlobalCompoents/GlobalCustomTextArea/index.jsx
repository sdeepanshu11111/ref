import React from "react";
import "./index.scss"; // Import the CSS file
import { Input } from "antd";
const { TextArea } = Input;
const GlobalCustomTextArea = (props) => {
  return (
    <div className="custom-textarea-container">
      <TextArea type="text" className="custom-textarea" {...props} />
      <div className="label">{props?.label}</div>
    </div>
  );
};

export default GlobalCustomTextArea;
