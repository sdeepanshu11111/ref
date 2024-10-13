import { Button } from "antd";
import React from "react";
import { DoubleIcon } from "../../../Icons";

export const ResouceCard = ({ heading, text, buttonText,theme,link }) => {
    
  return (
    <div className="resource-card">
      <div className= {`card-data ${theme} `}>
        <div className="heading-container">{heading}</div>
        <div className="main-container">{text}</div>
        <div className="btn-container">
          <a href={link} target="_blank">
          <Button className="btn-card">
            {" "}
            <span className="icon-container">
              {" "}
              <DoubleIcon />
            </span>
            {buttonText}
          </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
