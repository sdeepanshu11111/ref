import { Button } from "antd";
import React from "react";
import { useContext } from "react";
import { CrossIcon } from "../../../../assets/Icons/CrossIcon";
import OrdersContext from "../../OrdersContext";
import "./index.scss";
export const HeaderSection = ({ onClose, headerIcon=null, headingText }) => {
  return (
    <div className="orders-page-modal-header-container">
      {" "}
      {!!headerIcon && <span className="header-icon">{headerIcon}</span>}{" "}
      {headingText}
      <div className="btn-container">
        <Button icon={<CrossIcon />} size="large" onClick={onClose} />
      </div>
    </div>
  );
};
