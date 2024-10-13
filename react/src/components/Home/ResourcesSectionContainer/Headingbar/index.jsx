import { Button } from "antd";
import React from "react";
import { elements } from "./constants";
import "./index.scss";
export const HeadingBar = () => {
  
  return (
    <div className="resources-heading-bar">
      {elements.map((ele) => {
        return (
          <Button type="text" className="text-btn" onClick={ele.handle}>
           
            <span className="icon-container">{ele.icon}</span> {ele.label}
          </Button>
        );
      })}
    </div>
  );
};
