import React from "react";
import { AlertYellow } from "../../../../Orders/Icons";
import "./index.scss";
export const ReplaceSection = ({ rvpReason, setRvpReason }) => {
  return (
    <div className="rePlaceInfoSection">
      {" "}
      <div className="divider-container">
        <div className="item-1"> Replacement</div>
        <div className="item-2"></div>
      </div>
      
      <div className="info-bar-container">
        <div>
          <AlertYellow />
        </div>
        <div>
          <span>Important:</span> A new order will be credited that will be
          visible in Open Orders section on raising a replacement order.
        </div>
      </div>
    </div>
  );
};
