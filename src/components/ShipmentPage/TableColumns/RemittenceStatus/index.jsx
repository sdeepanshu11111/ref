import React from "react";
import { remittenceObj } from "./constants.js";
import "./index.scss";
export const RemittanceStatusCol = ({ obj, colHeight }) => {
  return (
    <div
      className="shipment-remittence-status-col"
      style={{
        height: colHeight,
      }}
    >
     
      <div
        className="status-container"
        style={{ ...remittenceObj[obj?.remittance_status?.status]?.style }}
      >
        {remittenceObj[obj?.remittance_status?.status]?.label}
      </div>
    </div>
  );
};
